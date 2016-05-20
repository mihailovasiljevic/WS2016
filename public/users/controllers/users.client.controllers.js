angular.module('user')
    .controller('LoginCtrl', ['$rootScope', 'User'], 
    function($rootScope, User){
        var that = this;
        
        that.user = {};
        
        that.input = {
            type: 'password',
            placegolder: 'Password',
            confirmPlaceholder: 'Repeat Password',
            iconClass: '',
            tooltipText: 'Show password'
        };
        
        that.tooglePasswordVisible = function(){
            that.input.type = that.input.type === 'text' ? 'password' : 'text';
            that.input.placeholder = that.input.placeholder === 'Password' ? 'Visible Password' : 'Password';
            that.input.iconClass = that.input.iconClass === 'icon_hide_password' ? '' : 'icon_hide_password';
            that.input.tooltipText = that.input.tooltipText === 'Show password' ? 'Hide password' : 'Show password';
        };
        
        $rootScope.$on('loginfailed', function(){
            that.loginError = User.loginError;
        });
        
        that.login = function(){
            User.login(this.user);
        };
        
    });