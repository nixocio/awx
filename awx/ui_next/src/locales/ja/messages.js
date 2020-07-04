/* eslint-disable */ module.exports = {
  languageData: {
    plurals: function (n, ord) {
      if (ord) return 'other';
      return 'other';
    },
  },
  messages: {
    '404': '404',
    '> add': '> add',
    '> edit': '> edit',
    'AWX Logo': 'AWX Logo',
    About: 'About',
    'AboutModal Logo': 'AboutModal Logo',
    Access: 'Access',
    Add: 'Add',
    'Add Roles': 'Add Roles',
    'Add Team Roles': 'Add Team Roles',
    'Add User Roles': 'Add User Roles',
    Administration: 'Administration',
    Admins: 'Admins',
    'Ansible Environment': 'Ansible Environment',
    'Ansible Version': 'Ansible Version',
    Applications: 'Applications',
    'Apply roles': 'Apply roles',
    'Are you sure you want to delete:': 'Are you sure you want to delete:',
    'Are you sure you want to remove {0} access from {1}?  Doing so affects all members of the team.': function (
      a
    ) {
      return [
        'Are you sure you want to remove ',
        a('0'),
        ' access from ',
        a('1'),
        '?  Doing so affects all members of the team.',
      ];
    },
    'Are you sure you want to remove {0} access from {username}?': function (
      a
    ) {
      return [
        'Are you sure you want to remove ',
        a('0'),
        ' access from ',
        a('username'),
        '?',
      ];
    },
    Authentication: 'Authentication',
    'Authentication Settings': 'Authentication Settings',
    'Brand Image': 'Brand Image',
    Cancel: 'Cancel',
    'Cannot find organization with ID': 'Cannot find organization with ID',
    'Cannot find resource.': 'Cannot find resource.',
    'Cannot find route {0}.': function (a) {
      return ['Cannot find route ', a('0'), '.'];
    },
    Close: 'Close',
    Collapse: 'Collapse',
    'Copyright 2018 Red Hat, Inc.': 'Copyright 2018 Red Hat, Inc.',
    'Copyright 2019 Red Hat, Inc.': 'Copyright 2019 Red Hat, Inc.',
    'Create New Organization': 'Create New Organization',
    Created: 'Created',
    'Credential Types': 'Credential Types',
    Credentials: 'Credentials',
    'Current page': 'Current page',
    Dashboard: 'Dashboard',
    Delete: 'Delete',
    'Delete {0}': function (a) {
      return ['Delete ', a('0')];
    },
    'Delete {itemName}': function (a) {
      return ['Delete ', a('itemName')];
    },
    Description: 'Description',
    Details: 'Details',
    Edit: 'Edit',
    'Edit Details': 'Edit Details',
    Expand: 'Expand',
    Failure: 'Failure',
    First: 'First',
    'Go to first page': 'Go to first page',
    'Go to last page': 'Go to last page',
    'Go to next page': 'Go to next page',
    'Go to previous page': 'Go to previous page',
    Help: 'Help',
    'If you {0} want to remove access for this particular user, please remove them from the team.': function (
      a
    ) {
      return [
        'If you ',
        a('0'),
        ' want to remove access for this particular user, please remove them from the team.',
      ];
    },
    Info: 'Info',
    'Instance Groups': 'Instance Groups',
    Integrations: 'Integrations',
    'Invalid username or password. Please try again.':
      'Invalid username or password. Please try again.',
    Inventories: 'Inventories',
    'Inventory Scripts': 'Inventory Scripts',
    'Items Per Page': 'Items Per Page',
    'Items per page': 'Items per page',
    'Items {itemMin} \u2013 {itemMax} of {count}': function (a) {
      return [
        'Items ',
        a('itemMin'),
        ' \u2013 ',
        a('itemMax'),
        ' of ',
        a('count'),
      ];
    },
    Jobs: 'Jobs',
    'Jobs Settings': 'Jobs Settings',
    Last: 'Last',
    'Last Modified': 'Last Modified',
    'Last Name': 'Last Name',
    License: 'License',
    'Loading...': 'Loading...',
    Logout: 'Logout',
    'Management Jobs': 'Management Jobs',
    Members: 'Members',
    Modified: 'Modified',
    'My View': 'My View',
    Name: 'Name',
    Next: 'Next',
    'No {0} Found': function (a) {
      return ['No ', a('0'), ' Found'];
    },
    'Notification Templates': 'Notification Templates',
    Notifications: 'Notifications',
    'Organization Add': 'Organization Add',
    'Organization detail tabs': 'Organization detail tabs',
    Organizations: 'Organizations',
    'Organizations List': 'Organizations List',
    Page: 'Page',
    'Page <0/> of {pageCount}': function (a) {
      return ['Page <0/> of ', a('pageCount')];
    },
    'Page Number': 'Page Number',
    Pagination: 'Pagination',
    Password: 'Password',
    'Per Page': 'Per Page',
    'Please add {0} to populate this list': function (a) {
      return ['Please add ', a('0'), ' to populate this list'];
    },
    'Please add {0} {itemName} to populate this list': function (a) {
      return [
        'Please add ',
        a('0'),
        ' ',
        a('itemName'),
        ' to populate this list',
      ];
    },
    'Portal Mode': 'Portal Mode',
    Previous: 'Previous',
    'Primary Navigation': 'Primary Navigation',
    Projects: 'Projects',
    'Remove {0} Access': function (a) {
      return ['Remove ', a('0'), ' Access'];
    },
    Resources: 'Resources',
    Save: 'Save',
    Schedules: 'Schedules',
    Search: 'Search',
    'Search text input': 'Search text input',
    Select: 'Select',
    'Select Input': 'Select Input',
    'Select Users Or Teams': 'Select Users Or Teams',
    'Select a row to delete': 'Select a row to delete',
    'Select all': 'Select all',
    'Select items from list': 'Select items from list',
    'Select the Instance Groups for this Organization to run on.':
      'Select the Instance Groups for this Organization to run on.',
    'Select {header}': function (a) {
      return ['Select ', a('header')];
    },
    Selected: 'Selected',
    Settings: 'Settings',
    Sort: 'Sort',
    Successful: 'Successful',
    System: 'System',
    'System Settings': 'System Settings',
    Team: 'Team',
    'Team Roles': 'Team Roles',
    Teams: 'Teams',
    Templates: 'Templates',
    'This field must not be blank': 'This field must not be blank',
    'This field must not exceed {max} characters': function (a) {
      return ['This field must not exceed ', a('max'), ' characters'];
    },
    'Toggle notification failure': 'Toggle notification failure',
    'Toggle notification success': 'Toggle notification success',
    'Use Default {label}': function (a) {
      return ['Use Default ', a('label')];
    },
    User: 'User',
    'User Details': 'User Details',
    'User Interface': 'User Interface',
    'User Interface Settings': 'User Interface Settings',
    'User Roles': 'User Roles',
    Username: 'Username',
    Users: 'Users',
    Views: 'Views',
    'Welcome to Ansible {brandName}! Please Sign In.': function (a) {
      return ['Welcome to Ansible ', a('brandName'), '! Please Sign In.'];
    },
    'You do not have permission to delete the following {0}: {itemsUnableToDelete}': function (
      a
    ) {
      return [
        'You do not have permission to delete the following ',
        a('0'),
        ': ',
        a('itemsUnableToDelete'),
      ];
    },
    'You have been logged out.': 'You have been logged out.',
    'add {currentTab}': function (a) {
      return ['add ', a('currentTab')];
    },
    'adding {currentTab}': function (a) {
      return ['adding ', a('currentTab')];
    },
    'cancel delete': 'cancel delete',
    'confirm delete': 'confirm delete',
    'confirm removal of {currentTab}/cancel and go back to {currentTab} view.': function (
      a
    ) {
      return [
        'confirm removal of ',
        a('currentTab'),
        '/cancel and go back to ',
        a('currentTab'),
        ' view.',
      ];
    },
    'delete {currentTab}': function (a) {
      return ['delete ', a('currentTab')];
    },
    'deleting {currentTab} association with orgs': function (a) {
      return ['deleting ', a('currentTab'), ' association with orgs'];
    },
    'edit view': 'edit view',
    items: 'items',
    'of {pageCount}': function (a) {
      return ['of ', a('pageCount')];
    },
    pages: 'pages',
    'per page': 'per page',
    'save/cancel and go back to view': 'save/cancel and go back to view',
    'save/cancel and go back to {currentTab} view': function (a) {
      return ['save/cancel and go back to ', a('currentTab'), ' view'];
    },
    'select organization {itemId}': function (a) {
      return ['select organization ', a('itemId')];
    },
    '{0}': function (a) {
      return [a('0')];
    },
    '{0} List': function (a) {
      return [a('0'), ' List'];
    },
    '{currentTab} detail view': function (a) {
      return [a('currentTab'), ' detail view'];
    },
    '{itemMin} - {itemMax} of {count}': function (a) {
      return [a('itemMin'), ' - ', a('itemMax'), ' of ', a('count')];
    },
  },
};
