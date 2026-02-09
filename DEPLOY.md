# Deploying to npm

This guide covers how to deploy your packages (`@baklavue/ui` and `@baklavue/composables`) to npm.

## Prerequisites

### 1. npm Account Setup

1. Create an npm account at https://www.npmjs.com/signup
2. Verify your email address
3. If publishing scoped packages (`@baklavue/*`), ensure you have access to the `baklavue` organization on npm, or the packages will be published under your personal account

### 2. Local npm Authentication

Log in to npm from your terminal:

```bash
npm login
```

Enter your npm username, password, and email when prompted.

Verify you're logged in:

```bash
npm whoami
```

### 3. GitHub Secrets (for automated releases)

If using GitHub Actions for automated releases, set these secrets in your repository:

1. Go to your GitHub repository → Settings → Secrets and variables → Actions
2. Add the following secrets:
   - `NPM_TOKEN`: Your npm authentication token (create at https://www.npmjs.com/settings/YOUR_USERNAME/tokens)
   - `GH_TOKEN`: GitHub Personal Access Token with `repo` scope

## Deployment Methods

### Method 1: Automated Deployment (Recommended)

Your project is configured with **Semantic Release** for automated versioning and publishing.

#### How it works:

1. **Make changes** and commit using conventional commit format:
   ```bash
   git commit -m "feat: add new feature"
   git commit -m "fix: resolve bug"
   ```

2. **Push to main branch**:
   ```bash
   git push origin main
   ```

3. **GitHub Actions automatically**:
   - Analyzes commits
   - Determines version bump (patch/minor/major)
   - Publishes to npm
   - Creates GitHub release
   - Updates changelog

#### Testing before release:

```bash
# Test UI package release (dry run)
cd packages/ui
bun run release:dry-run

# Test Composables package release (dry run)
cd packages/composables
bun run release:dry-run
```

### Method 2: Manual Deployment

If you need to publish manually:

#### Step 1: Update version manually

Edit `package.json` in the package you want to publish:

```bash
# For UI package
cd packages/ui
# Edit version in package.json (e.g., "1.0.0")
```

#### Step 2: Build (if needed)

Currently, your packages publish TypeScript source files directly. If you need to build:

```bash
# Add build script to package.json if needed
# Then run: bun run build
```

#### Step 3: Publish to npm

```bash
# For UI package
cd packages/ui
npm publish --access public

# For Composables package
cd packages/composables
npm publish --access public
```

**Note**: The `--access public` flag is required for scoped packages (`@baklavue/*`) unless you have a paid npm account.

## Package Configuration

### Important fields for npm publishing

Your packages should include these fields in `package.json`:

```json
{
  "name": "@baklavue/ui",
  "version": "1.0.0",
  "description": "UI components for Baklavue",
  "main": "index.ts",
  "module": "index.ts",
  "types": "index.ts",
  "files": [
    "index.ts",
    "src/**/*",
    "README.md"
  ],
  "keywords": ["vue", "ui", "components"],
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/erbilnas/baklavue.git",
    "directory": "packages/ui"
  },
  "publishConfig": {
    "access": "public"
  }
}
```

### Current Status

Your packages currently:
- ✅ Have proper names (`@baklavue/ui`, `@baklavue/composables`)
- ✅ Use semantic-release for versioning
- ✅ Have release configurations
- ⚠️ May need additional metadata (description, keywords, license, repository)
- ⚠️ May need `files` field to specify what gets published
- ⚠️ May need `publishConfig` for scoped packages

## Troubleshooting

### Error: "You must verify your email"

```bash
# Check your email and verify it on npmjs.com
npm profile get
```

### Error: "You do not have permission to publish"

- Ensure you're logged in: `npm whoami`
- For scoped packages, check if you own the scope or need to create it
- Use `--access public` flag for scoped packages

### Error: "Package name already exists"

- The package name is already taken
- Choose a different name or contact the owner

### Error: "Invalid package name"

- Package names must be lowercase
- Scoped packages format: `@scope/package-name`
- No spaces or special characters (except `-`, `_`, `.`)

### Semantic Release not publishing

1. Check commit messages follow conventional format
2. Verify `NPM_TOKEN` and `GH_TOKEN` are set in GitHub secrets
3. Check GitHub Actions logs for errors
4. Ensure you're pushing to `main` branch

## Publishing Preview/Beta Versions

Your configuration supports preview releases on the `preview` branch:

```bash
# Push to preview branch
git checkout -b preview
git push origin preview
```

This will publish beta versions (e.g., `1.0.0-beta.1`) to npm.

## Verifying Published Packages

After publishing, verify on npm:

- UI Package: https://www.npmjs.com/package/@baklavue/ui
- Composables Package: https://www.npmjs.com/package/@baklavue/composables

Install and test:

```bash
npm install @baklavue/ui @baklavue/composables
```

## Next Steps

1. **First-time setup**:
   - [ ] Create npm account
   - [ ] Log in locally (`npm login`)
   - [ ] Set up GitHub secrets (`NPM_TOKEN`, `GH_TOKEN`)
   - [ ] Add missing package.json fields (description, keywords, license, etc.)

2. **Before first release**:
   - [ ] Test with `release:dry-run`
   - [ ] Ensure all package.json files have proper metadata
   - [ ] Verify `files` field includes what should be published

3. **First release**:
   - [ ] Make a conventional commit (e.g., `feat: initial release`)
   - [ ] Push to `main` branch
   - [ ] Monitor GitHub Actions workflow
   - [ ] Verify packages appear on npm
