'use strict';

var gulp = require('gulp'),
  install = require('gulp-install'),
  conflict = require('gulp-conflict'),
  template = require('gulp-template'),
  rename = require('gulp-rename'),
  _ = require('underscore.string'),
  inquirer = require('inquirer'),
  chalk = require('chalk');

gulp.task('default', function (done) {
  var prompts = [{
    type: 'confirm',
    name: 'moveon',
    message: 'Ready to get started?'
  }];

  console.log(chalk.blue.bold([
    '',
    '',
    '     ######     ###    ##     ## ########        ##  ######  ',
    '    ##    ##   ## ##   ###   ### ##     ##       ## ##    ## ',
    '    ##        ##   ##  #### #### ##     ##       ## ##       ',
    '    ##       ##     ## ## ### ## ########        ##  ######  ',
    '    ##       ######### ##     ## ##        ##    ##       ## ',
    '    ##    ## ##     ## ##     ## ##        ##    ## ##    ## ',
    '     ######  ##     ## ##     ## ##         ######   ######  ',
    '',
    ''
  ].join('\n')) +
  chalk.green.bold([
    '    Thanks for coming to the Gulp workshop at CampJS III!',
    '    We hope you enjoy it :)',
    '',
    '      - @markdalgleish & @michaeltaranto',
    '',
    ''
  ].join('\n')));

  inquirer.prompt(prompts, function (answers) {
    if (!answers.moveon) return done();

    answers.appNameSlug = _.slugify(answers.appName);
    gulp.src(__dirname + '/templates/**')
      .pipe(template(answers))
      .pipe(rename(function (file) {
        if (file.basename[0] === '_') {
          file.basename = '.' + file.basename.slice(1);
        }
      }))
      .pipe(conflict('./'))
      .pipe(gulp.dest('./'))
      .pipe(install())
      .on('end', function () {
        done();
      });
  });
});
