safa.controller('usersCtrl', function ($scope, $http, $rootScope, $location) {
    $scope.MainTitle = 'الفريق';
    
    $scope.tab_content = "templates/users/users.html";

    $scope.userEmail = '';

    $scope.sm1 = Array();

    loading.start();

    $scope._switch = function ($template) {
        $scope.tab_content = "templates/users/" + $template + ".html";
    };

    $scope.search_modal = function () {
        $('#mysrach').modal('show');
    };

    /**
     * PROFILE INFO
     **/
    $http.get(api_url + "profile?token="+window.localStorage.getItem("token")).then(function (response) {
        if (response.error) {
            $location.path("/login");
        }
        // dropdowns.countries($('select[name=country_id]'), response.data.user.country_id);
        // dropdowns.skills($('.skills-dropdown'));
        loading.stop();
        $scope.user = response.data.user;
        $scope.genders = genders;
//        $('select[name=gender]').val(response.data.user.info.gender);

        $http({
            url: api_url + 'company/groups/' + $scope.user.default_company_id+'?token='+window.localStorage.getItem("token"),
            method: 'GET',
        }).then(function (response) {
            if (response.data.error)
                alert(response.data.message);
            else {
                $scope.groups = response.data.groups;
                $scope.users1_group_id = $scope.groups[0];
                $scope.users2_group_id = $scope.groups[0];
            }
        });

        $http({
            url: api_url + 'lookups/team?token='+window.localStorage.getItem("token"),
            method: 'GET',
        }).then(function (response) {
            if (response.data.error)
                alert(response.data.message);
            else {
                $scope.team = response.data;
            }
        });
    }, function (response) {
        $location.path("/login");
    });



    $http({
        url: api_url + 'screen/display?token='+window.localStorage.getItem("token"),
        method: "GET"
    }).then(function (res) {
        $scope.screens = res.data;
    });
    
    
    $scope.select_group = function (idx) {
        if ($scope.key.company.group[idx].expand)
            $scope.key.company.group[idx].expand = 0;
        else
            $scope.key.company.group[idx].expand = 1;
    };

    $scope.select_menu1 = function (idx) {
        if ($scope.sm1.indexOf($scope.key.users[idx].user_id) != -1) {
            $scope.key.users[idx].checked = 0;
            $scope.sm1.splice($scope.sm1.indexOf($scope.key.users[idx].user_id), 1);
        } else {
            $scope.key.users[idx].checked = 1;
            $scope.sm1.push($scope.key.users[idx].user_id);
        }
    };

    $scope.user_status1 = function (idx) {
        if ($scope.key.users[idx].deactivated == 0) {
            $http({
                url: api_url + 'key/status?token='+window.localStorage.getItem("token"),
                data: {user_id: $scope.key.users[idx].user_id, status: 1},
                method: 'POST'
            }).then(function (res) {
                $scope.key.users[idx].deactivated = 1;
            });
        } else {
            $http({
                url: api_url + 'key/status?token='+window.localStorage.getItem("token"),
                data: {user_id: $scope.key.users[idx].user_id, status: 0},
                method: 'POST'
            }).then(function (res) {
                $scope.key.users[idx].deactivated = 0;
            });
        }
    };

    $scope.addToGroup1 = function () {
        $http({
            url: api_url + 'key/accept?token='+window.localStorage.getItem("token"),
            data: {company_user_request_id: $scope.sm1, group_id: $scope.users1_group_id.company_group_id},
            method: "POST"
        }).then(function (res) {
            $('#addGroup').hide();
            $($scope.key.users).each(function (x, y) {
                if ($scope.key.users[x].checked == 1) {
                    $scope.key.users[x].checked = 0;
                    $scope.key.users[x].info = {full_name: $scope.key.users[x].full_name};
                    $scope.key.company.group.filter(function (item) {
                        return item.company_group_id == $scope.users1_group_id.company_group_id;
                    })[0].user.push($scope.key.users[x]);
                }
            });
        });
    };

    /**
     * GETTING KEY INFO
     **/
    $http({
        url: api_url + 'key?token='+window.localStorage.getItem("token"),
        method: 'GET',
    }).then(function (response) {
        if (response.data.error)
            error.fire(response.data.message);
        else {
            $scope.key = response.data;
        }
    });

    /**
     * COMPANY INVITATIONS
     **/
    $http({
        url: api_url + 'userinvitation/companyinvitations?token='+window.localStorage.getItem("token"),
        method: 'GET',
    }).then(function (response) {
        if (response.data.error)
            error.fire(response.data.message);
        else {
            $scope.invitations = response.data;
        }
    });

    $scope.delete_request = function (idx) {
        areyousure = confirm("هل انت متأكد انك تريد الحذف ");
        if (areyousure) {
            $http({
                url: api_url + 'userinvitation/companydeleteinvitation?token='+window.localStorage.getItem("token"),
                data: {user_id: $scope.invitations.outgoing[idx].user_id},
                method: "POST"
            }).then(function (res) {
                $scope.invitations.outgoing.splice(idx, 1);
            });
        }
    };

    /**
     * ADD USER TO GROUP
     **/
    $scope.addUserToGroup = function () {
        if ($scope.sm1.length)
            modal("addGroup");
    };

    /**
     * USER INVITATION
     **/
    $scope.userInvitation = function () {
        
        modal('invit');
        
   


    };

    $scope._userInvitation = function () {
        $http({
            url: api_url + 'userinvitation/companyinvite?token='+window.localStorage.getItem("token"),
            data: {email: [$scope.userEmail], company_group_id: $scope.popup_group_id},
            method: "POST"
        }).then(function (res) {
            $("#addEmp").modal('hide');
        });
    };

    /**
     * DELETE GROUP
     **/
    $scope.delete_group = function (index) {
        $scope.deletetedGroupIdx = index;
        modal('deleteGroup');
    };

    $scope._delete_group = function () {
        $http({
            url: api_url + 'key/removegroup?token='+window.localStorage.getItem("token"),
            data: {
                company_group_id: $scope.key.company.group[$scope.deletetedGroupIdx].company_group_id,
            },
            method: "POST"
        }).then(function (res) {
            $('#deletGroup').modal('hide');
            $scope.key.company.group.splice($scope.deletetedGroupIdx, 1);
        });
    };

    /**
     * DELETE USER
     **/
    $scope.delete_user = function () {

        $http({
            url: api_url + 'user/permanently/' + $scope.key.users[$scope.DELETE_USER_IDX].user_id +'?token='+window.localStorage.getItem("token"),
            method: "DELETE"
        }).then(function (res) {
            $scope.key.users.splice($scope.DELETE_USER_IDX, 1);
            $('#deleteEmp').modal('hide');
            $http({
                url: api_url + 'key',
                method: 'GET',
            }).then(function (response) {
                if (response.data.error)
                    error.fire(response.data.message);
                else {
                    $scope.key = response.data;
                }
            });

        });

    };

    $scope._delete_user = function (idx) {
        $scope.DELETE_USER_IDX = idx;
        $('#deleteEmp').modal('show');
    };

    /**
     * CREATE GROUP
     **/
    $scope.createGroup = function () {
        modal('manageGroups');
    };

    /**
     * ACCEPT / REFUSE USER INVITATION
     **/
    $scope._accept = function (idx) {
        $("#acceptReq").modal('show');
    };

    $scope.confirmed_accept = function () {
        $users = $scope.invitations.incoming.filter(function (x) {
            return x.checked = true;
        });
        $user_idz = Array();
        angular.forEach($users, function (x) {
            $user_idz.push(x.user_id);
        });
        $http({
            url: api_url + 'userinvitation/companyaccept?token='+window.localStorage.getItem("token"),
            data: {
                user_id: $user_idz,
                company_group_id: $rootScope.popup_group_id
            },
            method: "POST"
        }).then(function (res) {
            $scope.invitations.incoming.splice($scope.accept_idx, 1);
        });
    };

    $scope._refuse = function (idx) {
        $users = $scope.invitations.incoming.filter(function (x) {
            return x.checked = true;
        });
        $user_idz = Array();
        angular.forEach($users, function (x) {
            $user_idz.push(x.user_id);
        });
        $http({
            url: api_url + 'userinvitation/companyreject?token='+window.localStorage.getItem("token"),
            data: {user_id: $user_idz},
            method: "POST"
        }).then(function (res) {
            //$scope.key.company.user_request = $scope.key.company.user_request.filter(function(item){
            //    return ! item.checked;
            //});
            $scope.invitations.incoming.splice(idx, 1);
            //$scope.sm3 = Array();
        });
    };
    
    
    $scope.new_branch = function(){
        
    };
    
    
    
    $scope.newEmpInBranch = function(item){
        
    };
    
    
});

/**
 * CREATE A NEW GROUP
 **/
safa.controller('create_groupCtrl', function ($scope, $rootScope, $http, $location) {
    $scope.srcenz = Array();

    $http({
        url: api_url + 'screen/display?token='+window.localStorage.getItem("token"),
        method: "GET"
    }).then(function (res) {
        $scope.screens = res.data;

        $(document).ready(function () {
            $('.section-one-per .check-waiter input').click(function () {
                console.log('works');
                $(this).closest('div').toggleClass('if-checked-on');
            });
        });

    });

    $scope._createNewGroup = function () {
        $checked = [];
        $checked = $scope.screens.offline.filter(function (x) {
            return x.checked == 1;
        });
        $checked.push.apply($checked, $scope.screens.online.filter(function (x) {
            return x.checked == 1;
        }));

        $.map($checked, function (x) {
            return x.screen_id;
        });

        $http({
            url: api_url + 'key/acceptnew?token='+window.localStorage.getItem("token"),
            data: {group_name: $rootScope.newGroupName, screen: $scope.srcenz},
            method: "POST"
        }).then(function (res) {
            $location.path('users');
        });
    };

    $scope.checkPermission = function (type, idx) {
        if ($scope.srcenz.indexOf($scope.screens[type][idx].screen_id) != -1) {
            $scope.screens[type][idx].checked = 0;
            $scope.srcenz.splice($scope.srcenz.indexOf($scope.screens[type][idx].screen_id), 1);
        } else {
            $scope.screens[type][idx].checked = 1;
            $scope.srcenz.push($scope.screens[type][idx].screen_id);
        }
    };

    $scope._manageGroup = function () {
        $scope._createNewGroup();
    };






// groups
    $rootScope.newGroupName;
    $scope.checkPermission = Array();
    $scope.srcenz = Array();

    $scope.statusOfPermissionWindow = 1;

    $http({
        url: api_url + 'screen/display?token='+window.localStorage.getItem("token"),
        method: "GET"
    }).then(function (res) {
        $scope.screens = res.data;

        $('#myPopup').modal('show');
        $(document).ready(function () {
            $('.section-one-per .check-waiter input').click(function () {
                console.log('works');
                $(this).closest('div').toggleClass('if-checked-on');
            });
        });

        $http({
            url: api_url + 'group/load/' + $routeParams.id+'?token='+window.localStorage.getItem("token"),
            method: "GET"
        }).then(function (res) {
            $rootScope.newGroupName = res.data.group.name;

            selected = $.map(res.data.group.screen, function (x) {
                return x.screen_id;
            });

            //$scope.key.company.group = $scope.key.company.group.filter(function(x){
            //    if(selected.indexOf(x.screen_id) !== -1) {
            //        x.checked = 1;
            //    }
            //    return x;
            //});
            //log($scope.key.company.group);
            //

            $scope.screens.online = $scope.screens.online.filter(function (x) {
                if (selected.indexOf(x.screen_id) !== -1) {
                    x.checked = 1;
                }
                return x;
            });
            $scope.screens.offline = $scope.screens.offline.filter(function (x) {
                if (selected.indexOf(x.screen_id) !== -1) {
                    x.checked = 1;
                }
                return x;
            });

        });

    });


    $scope._editGroup = function () {
        $checked = [];
        $checked = $scope.screens.offline.filter(function (x) {
            return x.checked == 1;
        });
        $checked.push.apply($checked, $scope.screens.online.filter(function (x) {
            return x.checked == 1;
        }));

        $.map($checked, function (x) {
            return x.screen_id;
        });
        $http({
            url: api_url + 'key/editgroup?token='+window.localStorage.getItem("token"),
            data: {
                groupid: $routeParams.id,
                group_name: $rootScope.newGroupName,
                screen: $.map($checked, function (x) {
                    return x.screen_id;
                })
            },
            method: "POST"
        }).then(function (res) {
            $location.path('users');
            //newGroup = {
            //    company_group_id: res.data.GroupID,
            //    company_id: $scope.user.default_company_id,
            //    name: $scope.new_group_name
            //};
            //$('#myPopup').modal('hide');
            //$scope.key.company.group.push(newGroup);
            //$scope.groups.push(newGroup);
        });
    };


    $scope.checkPermission = function (type, idx) {
        if ($scope.srcenz.indexOf($scope.screens[type][idx].screen_id) != -1) {
            $scope.screens[type][idx].checked = 0;
            $scope.srcenz.splice($scope.srcenz.indexOf($scope.screens[type][idx].screen_id), 1);
        } else {
            $scope.screens[type][idx].checked = 1;
            $scope.srcenz.push($scope.screens[type][idx].screen_id);
        }
    };


    $scope._manageGroup = function () {
        $scope._editGroup();
    };

});
