(function() {
    'use strict';

    angular
        .module('app')
        .directive('pimJoin', pimJoin);


    function pimJoin($uibModal, $timeout, EntityService, localStorageService){
        return {
            restrict: 'E',
            scope: {
                key: '=', config: '=', value: '=', isValid: '=', isSubmit: '=', onChangeCallback: '&'
            },
            templateUrl: function(){
                return 'types/join/join.html'
            },
            link: function(scope, element, attrs){
                var itemsPerPage = 10;
                var entity       = null;

                //Properties
                scope.chooserOpened = false;
                scope.currentPage   = 1;
                scope.propertyCount = 0;
                scope.objects       = [];
                scope.schema        = null;
                scope.selectedIndex = 0;
                scope.totalPages    = 1;


                //Functions
                scope.addNewObject  = addNewObject;
                scope.change        = change;
                scope.chooseObject  = chooseObject;
                scope.closeChooser  = closeChooser;
                scope.editObject    = editObject;
                scope.keyPressed    = keyPressed;
                scope.loadData      = loadData;
                scope.openChooser   = openChooser;
                scope.removeObject  = removeObject;
                scope.setSelectedIndex = setSelectedIndex;

                //Startup
                init();

                /////////////////////////////////////

                function addNewObject(){
                    var modalInstance = $uibModal.open({
                        templateUrl: 'views/form.html',
                        controller: 'FormCtrl as vm',
                        resolve: {
                            entity: function(){ return entity;},
                            title: function(){ return 'Neues Objekt anlegen'; },
                            object: function(){ return null; }
                        },
                        size: 'lg'
                    });

                    modalInstance.result.then(
                        function (newObject) {
                            if(newObject){
                                chooseObject(newObject);
                            }
                        },
                        function () {}
                    );
                }

                function change(){
                    scope.currentPage = 1;
                    loadData();
                }

                function chooseObject(object){

                    scope.value = object;
                    scope.onChangeCallback({key: scope.key, value: object.id});

                    scope.selectedIndex = 0;
                    scope.currentPage = 1;

                    scope.search        = '';
                    scope.objects       = [];


                    closeChooser();

                }

                function closeChooser(){
                    scope.chooserOpened = false;
                }

                function editObject(){

                    var modalInstance = $uibModal.open({
                        templateUrl: 'views/form.html',
                        controller: 'FormCtrl as vm',
                        resolve: {
                            entity: function(){ return entity;},
                            title: function(){ return 'Objekt ' + scope.value.id + ' bearbeiten'; },
                            object: function(){ return scope.value; }
                        },
                        size: 'lg'
                    });

                    modalInstance.result.then(
                        function (newObject) {
                            if(newObject){
                                scope.value = newObject;
                            }
                        },
                        function () {}
                    );
                }
                
                function init(){
                    if(scope.config.accept.substr(0, 18) == 'Areanet\\PIM\\Entity'){
                        entity = scope.config.accept.replace('Areanet\\PIM\\Entity', 'PIM');
                    }else{
                        var fullEntity = null;
                        fullEntity = scope.config.accept.split('\\');
                        entity = fullEntity[(fullEntity.length - 1)];
                    }
                    
                    scope.schema    = localStorageService.get('schema')[entity];

                    scope.propertyCount = Object.keys(scope.schema.list).length;
                }

                function keyPressed(event){
                    switch(event.keyCode) {
                        case 40:
                            if (scope.selectedIndex < scope.objects.length - 1) scope.selectedIndex++;
                            break;
                        case 38:
                            if (scope.selectedIndex > 0) scope.selectedIndex--;
                            break;
                        case 13:
                            chooseObject(scope.objects[scope.selectedIndex]);
                            event.stopPropagation();
                            break;
                        case 39:
                            if (scope.currentPage < scope.totalPages){
                                scope.currentPage++;
                                loadData();
                            }
                            break;
                        case 37:
                            if(scope.currentPage > 1){
                                scope.currentPage--;
                                loadData();
                            }
                            break;
                        case 27:
                            closeChooser();
                            event.stopPropagation();
                            break;
                    }
                }

                function loadData(){
                    var where = scope.search ? {fulltext: scope.search} : {};

                    var data = {
                        entity: entity,
                        currentPage: scope.currentPage,
                        itemsPerPage: itemsPerPage,
                        where: where
                    };
                    EntityService.list(data).then(
                        function successCallback(response) {
                            scope.totalPages    = Math.ceil(response.data.totalItems / itemsPerPage);
                            scope.objects       = response.data.data;
                            scope.selectedIndex = 0;
                        },
                        function errorCallback(response) {
                            scope.objects = [];
                        }
                    );
                }

                function openChooser(){
                    scope.chooserOpened = true;

                    $timeout(function () {
                        element.find('#search').focus();
                    }, 50);

                    loadData();
                }

                function removeObject(){
                    scope.value = {};
                    scope.onChangeCallback({key: scope.key, value: ''});
                }

                function setSelectedIndex(index){
                    scope.selectedIndex = index;
                }

            }
        }
    }

})();
