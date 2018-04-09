#!/usr/bin/env node

const fs  = require('fs'),
      sh  = require('shelljs'),
      zip = require('archiver')

const ostream = fs.createWriteStream(`${sh.pwd()}/release.zip`),
      archive = zip('zip', {
        zlib: { level: 9 }
      })

archive.pipe(ostream)

archive.on('warning', err => {
  if (err.code === 'ENOENT') {
    console.warn(err.message)
  } else {
    throw err
  }
})

archive.on('error', err => { throw err })

/**
 * Directories
 */
const DIRS = [
  'blocks',
  'core',
  'scss',
  'dist',
  'wordpress',
  'includes'
]
.forEach(dir => archive.directory(dir))

/**
 * Files
 */
const FILES = [
  'readme.txt',
  'README.md'
]
.forEach(file => archive.file(file))

/**
 * Glob patterns
 */
const GLOBS = [
  '*.php'
]
.forEach(glob => archive.glob(glob))

// Good to go
archive.finalize()
