#!/bin/bash

# Conventional Commit Helper Script
# Usage: ./scripts/commit.sh <type> <scope> <description>

if [ $# -lt 2 ]; then
    echo "Usage: $0 <type> [scope] <description>"
    echo ""
    echo "Types:"
    echo "  feat     - A new feature"
    echo "  fix      - A bug fix"
    echo "  docs     - Documentation only changes"
    echo "  style    - Changes that do not affect the meaning of the code"
    echo "  refactor - A code change that neither fixes a bug nor adds a feature"
    echo "  perf     - A code change that improves performance"
    echo "  test     - Adding missing tests or correcting existing tests"
    echo "  chore    - Changes to the build process or auxiliary tools"
    echo ""
    echo "Examples:"
    echo "  $0 feat add new button component"
    echo "  $0 fix ui resolve button alignment issue"
    echo "  $0 docs update installation instructions"
    exit 1
fi

TYPE=$1
SCOPE=""
DESCRIPTION=""

if [ $# -eq 2 ]; then
    DESCRIPTION="$2"
else
    SCOPE="$2"
    DESCRIPTION="$3"
fi

# Validate type
VALID_TYPES=("feat" "fix" "docs" "style" "refactor" "perf" "test" "chore")
VALID_TYPE=false

for valid_type in "${VALID_TYPES[@]}"; do
    if [ "$TYPE" = "$valid_type" ]; then
        VALID_TYPE=true
        break
    fi
done

if [ "$VALID_TYPE" = false ]; then
    echo "Error: Invalid type '$TYPE'"
    echo "Valid types: ${VALID_TYPES[*]}"
    exit 1
fi

# Build commit message
if [ -n "$SCOPE" ]; then
    COMMIT_MSG="$TYPE($SCOPE): $DESCRIPTION"
else
    COMMIT_MSG="$TYPE: $DESCRIPTION"
fi

echo "Commit message: $COMMIT_MSG"
echo ""

# Ask for confirmation
read -p "Proceed with commit? (y/N): " -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]]; then
    git add .
    git commit -m "$COMMIT_MSG"
    echo "✅ Committed successfully!"
else
    echo "❌ Commit cancelled"
    exit 1
fi
