const fs = require('fs');
const path = require('path');

// Configuration
const OLD_IMPORT = '@elizaos/core';
const NEW_IMPORT = '@elizaos/core-plugin-v1';

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}


function findImportOccurrences(dir, searchTerm) {
  const results = [];

  function walk(currentPath) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath); // recurse into subdirectory
      } else if (entry.isFile()) {
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          if (content.includes(searchTerm)) {
            results.push(fullPath);
          }
        } catch (e) {
          // Optionally log and skip unreadable files
          console.warn(`Skipping unreadable file: ${fullPath}`);
        }
      }
    }
  }

  walk(dir);
  return results;
}

function buildPluginFromDir(pluginDir) {
  const corePath = path.join(pluginDir, 'node_modules', '@elizaos', 'core');

  let references
  try {
    references = findImportOccurrences(pluginDir, OLD_IMPORT)
  } catch (error) {
    console.error('lib.migrate::buildPluginFromDir - error', error)
    // grep returns non-zero if no matches, which is not an error for us
    references = [];
  }

  // Check for specific reference locations
  const hasSrcRefs = references.some(ref => ref.includes('/src/'));
  const hasDistRefs = references.some(ref => ref.includes('/dist/'));
  const hasPackageJsonRefs = references.some(ref => ref.endsWith('package.json:'));

  return {
    name: path.basename(pluginDir),
    path: pluginDir,
    references,
    hasNodeModulesCore: fs.existsSync(corePath),
    hasSrcRefs,
    hasDistRefs,
    hasPackageJsonRefs
  }
}

// Migrate all references in a single plugin
function migratePlugin(plugin) {
  console.log(`Checking ${plugin.name} source code for version compatibility`);
  const results = {
    files: 0,
    packageJson: false,
    tsupConfig: false,
    nodeModules: false
  };

  // 1. Replace all text references in files
  if (plugin.references.length > 0) {
    const filesToUpdate = new Set();

    for (const ref of plugin.references) {
      const parts = ref.split(':');
      if (!parts.length) {
        continue
      }
      const file = parts.shift()
      try {
        const content = fs.readFileSync(file, 'utf-8');

        // Use a regex that will only match the exact string @elizaos/core
        // This prevents double replacements (@elizaos/core-plugin-v1-plugin-v1)
        // Using word boundary \b to ensure we don't replace partial matches
        // if (content.includes(OLD_IMPORT) && !content.includes(NEW_IMPORT)) {
        const escapedOldImport = escapeRegex(OLD_IMPORT);
        const regex = new RegExp(`(from\\s+['"])${escapedOldImport}(['"])`, 'g');
        const newContent = content.replace(regex, `$1${NEW_IMPORT}$2`);

        if (content !== newContent) {
          fs.writeFileSync(file, newContent);
          results.files++;
          console.log(`  Updated file: ${file}`);
        }
      } catch (error) {
        console.error(`  Error updating ${file}: ${error.message}`);
      }
    }
  }

  // 2. Update package.json
  const packageJsonPath = path.join(plugin.path, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
      let updated = false;

      if (packageJson.dependencies && packageJson.dependencies[OLD_IMPORT]) {
        const version = packageJson.dependencies[OLD_IMPORT];
        packageJson.dependencies[NEW_IMPORT] = version;
        delete packageJson.dependencies[OLD_IMPORT];
        updated = true;
      }

      if (packageJson.devDependencies && packageJson.devDependencies[OLD_IMPORT]) {
        const version = packageJson.devDependencies[OLD_IMPORT];
        packageJson.devDependencies[NEW_IMPORT] = version;
        delete packageJson.devDependencies[OLD_IMPORT];
        updated = true;
      }

      if (updated) {
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
        results.packageJson = true;
        console.log(`  Updated package.json`);
      }
    } catch (error) {
      console.error(`  Error updating package.json: ${error.message}`);
    }
  }

  // 3. Update tsup.config.ts if it exists
  const tsupConfigPath = path.join(plugin.path, 'tsup.config.ts');
  if (fs.existsSync(tsupConfigPath)) {
    try {
      const content = fs.readFileSync(tsupConfigPath, 'utf-8');

      // Use the same word boundary approach for tsup.config.ts
      const regex = new RegExp(`external\\s*:\\s*\\[[^\\]]*\\b${OLD_IMPORT}\\b[^\\]]*\\]`, 'g');
      const newContent = content.replace(regex, match => match.replace(OLD_IMPORT, NEW_IMPORT));

      if (content !== newContent) {
        fs.writeFileSync(tsupConfigPath, newContent);
        results.tsupConfig = true;
        console.log(`  Updated tsup.config.ts`);
      }
    } catch (error) {
      console.error(`  Error updating tsup.config.ts: ${error.message}`);
    }
  }

  // 4. Print a message about node_modules if needed
  if (plugin.hasNodeModulesCore) {
    results.nodeModules = true;
    console.log(`  Found @elizaos/core in node_modules - will need to reinstall dependencies`);
  }

  // Summary for this plugin
  let actionItems = [];
  if (results.files > 0) {
    actionItems.push(`replaced references in ${results.files} files`);
  }
  if (results.packageJson) {
    actionItems.push('updated package.json');
  }
  if (results.tsupConfig) {
    actionItems.push('updated tsup.config.ts');
  }
  if (results.nodeModules) {
    actionItems.push('found node_modules that need reinstallation');
  }

  if (actionItems.length > 0) {
    console.log(`  ✅ Migration actions: ${actionItems.join(', ')}`);

    // Additional instructions based on plugin type
    if (plugin.hasNodeModulesCore) {
      console.log(`  ⚠️ Remove node_modules and reinstall dependencies to complete migration`);
    }
  }

  return results;
}

module.exports = {
  buildPluginFromDir,
  migratePlugin,
}