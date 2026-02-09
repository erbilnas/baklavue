# Release Guide

This project uses [Semantic Release](https://semantic-release.gitbook.io/semantic-release/) for automated versioning and releases.

## Prerequisites

- **Node.js**: Version 20.8.1 or higher is required for semantic release
- **Bun**: Latest version for package management
- **Git**: For commit message analysis

## How It Works

Semantic Release automatically determines the next semantic version number and generates the changelog based on the commit messages. It follows the [Conventional Commits](https://www.conventionalcommits.org/) specification.

## Commit Message Format

Your commit messages must follow this format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat`: A new feature (triggers a minor release)
- `fix`: A bug fix (triggers a patch release)
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

### Examples

```
feat: add new button component
fix(ui): resolve button alignment issue
docs: update installation instructions
feat(composables): add useNotification hook
```

## Release Process

### Automatic Releases

1. Push your commits to the `main` branch
2. GitHub Actions will automatically run semantic release
3. If there are new features or fixes, a new version will be released
4. The changelog will be updated automatically

### Manual Release

To test the release process without actually releasing:

```bash
# Test the release process
bun run release:dry-run

# Run the actual release
bun run release
```

### Package-Specific Releases

Each package can be released independently:

```bash
# Release UI package
cd packages/ui
bun run release

# Release Composables package
cd packages/composables
bun run release
```

## Version Management

- **Patch releases** (1.0.0 → 1.0.1): Bug fixes
- **Minor releases** (1.0.0 → 1.1.0): New features
- **Major releases** (1.0.0 → 2.0.0): Breaking changes

## Breaking Changes

To indicate a breaking change, add `!` after the type/scope:

```
feat!: remove deprecated API
fix(ui)!: change button component API
```

## Configuration

The semantic release configuration is in `.releaserc.json` files:

- Root: `.releaserc.json`
- UI package: `packages/ui/.releaserc.json`
- Composables package: `packages/composables/.releaserc.json`

## GitHub Actions

The release workflow (`.github/workflows/release.yml`) automatically:

- Runs on pushes to `main` branch
- Sets up Node.js 20 and Bun
- Installs dependencies
- Runs semantic release

## Troubleshooting

If releases aren't working:

1. Check that your commit messages follow the conventional format
2. Ensure you're pushing to the `main` branch
3. Check GitHub Actions logs for errors
4. Verify that `NPM_TOKEN` secret is set (GITHUB_TOKEN is automatically provided by GitHub Actions)
5. Ensure Node.js version 20.8.1+ is available (GitHub Actions uses Node.js 20)

## Useful Commands

```bash
# Check current version
bun run semantic-release --dry-run

# View semantic-release configuration
bun run semantic-release --help

# Install semantic-release globally (if needed)
bun add -g semantic-release
```
