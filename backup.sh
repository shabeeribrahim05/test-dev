#!/bin/bash
# Website backup script for Al Mahruqi

# Set variables
BACKUP_DIR="/tmp/almahruqi_backup"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="almahruqi_backup_${DATE}.tar.gz"

# Create backup directory if it doesn't exist
mkdir -p "${BACKUP_DIR}"

# Create backup of website files
echo "Creating backup of Al Mahruqi website..."
tar -czf "${BACKUP_DIR}/${BACKUP_FILE}" \
    --exclude='.git' \
    --exclude='node_modules' \
    --exclude='*.log' \
    .

echo "Backup created: ${BACKUP_DIR}/${BACKUP_FILE}"
echo "Backup completed successfully!"

# Optional: Remove backups older than 30 days
find "${BACKUP_DIR}" -name "almahruqi_backup_*.tar.gz" -type f -mtime +30 -delete 2>/dev/null

echo "Old backups cleaned up."