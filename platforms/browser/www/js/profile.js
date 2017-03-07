/**
 * Copyright (C) Brightery 2015
 * Author Muhammad El-Saeed m.elsaeed@brightery.com
 * http://www.brightery.com
 */

profile = {
    update: function () {
        $.ajax({
            url: api_url + 'profile/info',
            type: 'post',
            xhrFields: {
                withCredentials: true
            },
            data: $('.profile_form').serialize(),
            success: function (res) {
                if (res.error)
                    error.fire(res.message);
                else {
                    $('.data').show();
                    $('.form-controller').hide();
                    $('.form-controller input').each(function (i, v) {
                        $(this).parent().prev().html($(this).val());
                    });
                    $('.form-controller select').each(function (i, v) {
                        $(this).parent().prev().html($(this).find(":selected").text());
                    });

                }
            }
        });
    }
};

skill = {
    update: function (that) {
        dropdowns.skills($(that).parent().parent().find('.skills-dropdown'), $(that).data('skill-id'));
        $(that).parent().parent().find('.update').show();
        $(that).parent().parent().find('.view').hide();
    },
    updateCancel: function (that) {
        $(that).parent().parent().find('.update').hide();
        $(that).parent().parent().find('.view').show();
    },
    updateApply: function (that) {
        $.post(api_url + 'profile/skill', $(that).parent().parent().parent().find('form').serialize(), function (res) {
            if (res.error)
                error.fire(res.message);
            else {
                // UPDATE VIEW
                $('.view').show();
                $('.update').hide();
                $(that).parent().parent().find('.update input').parent().prev().html($(that).parent().parent().find('.update input').val());
                $(that).parent().parent().find('.update select').parent().prev().html($(that).parent().parent().find('.update select').find(":selected").text());
            }
        });


    },
    delete: function (that) {
        areyousure = confirm("هل انت واثق انك تريد حذف هذا السجل؟");
        if (areyousure) {
            $.ajax({
                url: api_url + 'profile/skill/' + $(that).parent().parent().parent().find('form input[name=user_skills_id]').val(),
                type: 'DELETE',
                success: function (res) {
                    if (res.error)
                        error.fire(res.message);
                    else {
                        $(that).parent().parent().parent().parent().remove();
                    }
                }
            });
        }
    },
    add: function () {
        $.post(api_url + 'profile/skill', $('.add_skill_form').serialize(), function (res) {
            if (res.error)
                error.fire(res.message);
            else {

                // UPDATE VIEW
                var skill_entry = $('#skill_entry').html();
                Mustache.parse(skill_entry);
                var rendered = Mustache.render(skill_entry, {
                    name: $('.add_skill_form .skills-dropdown :selected').text(),
                    description: $('.add_skill_form .skills-input').val(),
                    user_skills_id: res.UserSkillID,
                    skill_id: $('.add_skill_form .skills-dropdown').val()
                });
                $('.skills_container').append(rendered);
                $('.skills-input').val('');
                $('.skills-dropdown').val('');
                $('#add_skill').hide();
            }
        });
    },
    addCancel: function () {
        $('.skills-input').val('');
        $('.skills-dropdown').val('');
        $('#add_skill').hide();
    }
};


safa.controller('profileCtrl', function ($scope, $http, $location, $rootScope) {
    $('.data-block-content').first().show();

    $('.data-block-title').on('click', function () {
        $('.data-block-content').hide();
        $(this).parent().find('.data-block-content').show();
    });

    $('.expand_collapse').on('click', function () {
        $('.data-block-content .data').hide();
        $('.data-block-content .form-controller').show();
    });

    $('.cancel').on('click', function () {
        $('.data-block-content .data').show();
        $('.data-block-content .form-controller').hide();
    });

    $('.add-new-skill').click(function () {
        $('#add_skill').toggle();
    });

    $scope.genders = genders;
    dropdowns.skills($('.skills-dropdown'));
    //$scope.user = $rootScope.user;
    //log()
    //loading.start();
    //$http.get(api_url + "profile")
    //    .then(function (response) {
    //        if (response.error) {
    //            $location.path("/login");
    //        }
    //
    //        loading.stop();
    //        $scope.user = response.data.user;
    //        dropdowns.countries($('select[name=country_id]'), response.data.user.country_id);
    //        $rootScope.user = $scope.user;
    //        $('select[name=gender]').val(response.data.user.info.gender);
    //    }, function (response) {
    //        $location.path("/login");
    //    });

    //$http.get(api_url + "news")
    //    .then(function (response) {
    //        $scope.news = response.data;
    //
    //    });


    $http({
        url: api_url + 'userinvitation/userinvitations',
        method: 'GET',
    }).then(function (response) {
        if (response.data.error)
            error.fire(response.data.message);
        else {
            $scope.invitations = response.data;
        }
    });



    $scope.userRequest = function () {
        $http({
            url: api_url + 'userinvitation/userinvite',
            data: {email: $scope.keyEmail},
            method: "post"
        }).then(function (res) {
            //$("#inv_popup").modal('hide');
            $http({
                url: api_url + 'userinvitation/userinvitations',
                method: 'GET',
            }).then(function (response) {
                if (response.data.error)
                    error.fire(response.data.message);
                else {
                    $scope.invitations = response.data;
                }
            });
        });
    };

    $scope._accept = function (idx) {
        $http({
            url: api_url + 'userinvitation/useraccept',
            data: {company_id: [$scope.invitations.incoming[idx].company_id]},
            method: "POST"
        }).then(function (res) {
            $scope.invitations.incoming.splice($scope.accept_idx, 1);
        });
    };

    $scope._refuse = function (idx) {
        $http({
            url: api_url + 'userinvitation/userreject',
            data: {company_id: [$scope.invitations.incoming[idx].company_id]},
            method: "POST"
        }).then(function (res) {
            //$scope.key.company.user_request = $scope.key.company.user_request.filter(function(item){
            //    return ! item.checked;
            //});
            $scope.invitations.incoming.splice(idx, 1);
            //$scope.sm3 = Array();
        });
    };

    $scope.delete_request = function (idx) {
        areyousure = confirm("هل انت واثق انك تريد الحذف؟");
        if (areyousure) {
            $http({
                url: api_url + 'userinvitation/userdeleteinvitation',
                data: {company_id: [$scope.invitations.outgoing[idx].company_id]},
                method: "POST"
            }).then(function (res) {
                $scope.invitations.outgoing.splice(idx, 1);
            });
        }
    };


});


safa.controller('homeCtrl', function ($scope, $http, $location) {

    $('.data-block-content').first().show();

    $('.data-block-title').on('click', function () {
        $('.data-block-content').hide();
        $(this).parent().find('.data-block-content').show();
    });

    $('.expand_collapse').on('click', function () {
        $('.data-block-content .data').hide();
        $('.data-block-content .form-controller').show();
    });

    $('.cancel').on('click', function () {
        $('.data-block-content .data').show();
        $('.data-block-content .form-controller').hide();
    });

    $('.add-new-skill').click(function () {
        $('#add_skill').toggle();
    });

    loading.start();
    $http.get(api_url + "profile")
        .then(function (response) {
            if (response.error) {
                $location.path("/login");
            }
            dropdowns.countries($('select[name=country_id]'), response.data.user.country_id);
            dropdowns.skills($('.skills-dropdown'));
            loading.stop();
            $scope.user = response.data.user;
            $scope.genders = genders;
            $('select[name=gender]').val(response.data.user.info.gender);
        }, function (response) {
            $location.path("/login");
        });


    $http.get(api_url + "news")
        .then(function (response) {
            $scope.news = response.data;

        });

});