var IssueTracker = function() { };

var search = {
  orgName: '',
  repos: [],
  selectedRepo: '',
  commits: []
};

var API_ROOT = 'https://api.github.com';

IssueTracker.prototype.init = function() {
  this.bindEvents();
}

IssueTracker.prototype.bindEvents = function() {
  var self = this;
  $('form').on('click', '[type="submit"]', function (e) {
    self.handleSubmit(e);
  });
  $('#results').on('click', 'button', function(e) {
    self.handleViewCommits(e);
  });
  $('#results').on('click', 'button', function() {
    self.launchModal();
  });
  $('.modal').on('click', '.close', function() {
    self.closeModal();
  });
}

IssueTracker.prototype.handleSubmit = function(e) {
  e.preventDefault();
  this.resetRepoList();
  search.orgName = $('input[type="text"]').val();
  if (search.orgName !== '') { this.getRepos() }
}

IssueTracker.prototype.handleViewCommits = function(e) {
  e.preventDefault();
  search.selectedRepo = $(e.target).attr('data-repo');
  this.getCommits();
}

IssueTracker.prototype.getRepos = function() {
  var self = this;
  $.ajax(API_ROOT + '/orgs/' + search.orgName + '/repos')
  .done(function(response) {
    search.repos = response;
    self.loadRepos();
  }).fail(function(error) {
    self.handleNoReposFound();
  });
}

IssueTracker.prototype.getCommits = function() {
  var self = this;
  $.ajax(API_ROOT + '/repos/' + search.orgName + '/' + search.selectedRepo + '/commits?per_page=10')
  .done(function(response) {
    search.commits = response;
    self.loadCommits();
  }).fail(function(error) {
    console.log(error);
  });
}

IssueTracker.prototype.handleNoReposFound = function() {
  search.repos = [];
  search.selectedRepo = '';
  search.commits = [];
  this.resetRepoList();
  $('.repos').append('<h3>Sorry, we could not find any public organizations under ' + search.orgName + '!<h3>');
}

IssueTracker.prototype.loadRepos = function() {
  var repo = '';
  var reposList = search.repos
    .sort(function(a,b) { b.open_issues - a.open_issues })
    .map(function(repo, i) {
      return '<li>' +
        '<span class="repoName">' + repo.name + '</span><br />' +
        '<span class="issueCount">' + repo.open_issues + ' open issues</span><br />' +
        '<button data-repo="' + repo.name + '">Browse commits</button>' +
      '</li>'
    });
  $('#results').append(reposList);
  this.bindEvents();
}

IssueTracker.prototype.loadCommits = function() {
  var commitsList = search.commits.map(function(commit, i) {
    return '<ul>' +
      '<li>Sha: ' + commit.sha + '</li>' +
      '<li>Commiter: ' + commit.author.login + '</li>' +
      '<li>Message: ' + commit.commit.message + '</li>' +
      '<li><a href="' + commit.url + '" target="_blank">view more details</a></li>' +
      '</ul>'
  });
  $('#modal-content').append(commitsList);
}

IssueTracker.prototype.launchModal = function() {
  $('.modal').show();
  $('#overlay').show();
  $('.modal').find('h4').text('Commit history for '+ search.selectedRepo);
  $('body').css('overflow', 'hidden');
}

IssueTracker.prototype.closeModal = function() {
  $('.modal').hide().find('h4').empty();
  $('#modal-content').html('');
  $('#overlay').hide();
  $('body').css('overflow', 'auto');
}

IssueTracker.prototype.resetRepoList = function() {
  $('.repos').find('h3').remove();
  $('#results').html('');
}

$(document).ready(function() {
  var issueTracker = new IssueTracker();
  issueTracker.init();
});
