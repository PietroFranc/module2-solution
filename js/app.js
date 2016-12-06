//Singleton Service 
var app = angular.module('Nuova', []);
// Singleton
app.service('NuovaService', function () {
 //Array to buy list 5 elements
 this.listaA=[{nome: "cookies", quantita:10},{nome: "brioche", quantita:5},{nome: "salade", quantita:8},{nome: "Coffee", quantita:3},{nome: "Corn Flakes", quantita:9}];
 //Array Already Boughtis empty
 this.listaB=[];


//variables assiocate to hide show list message
  this.msA=true;
  this.msB=false;
//function of service
//read A hide show message
  this.leggiA=function(){
       return this.msA;
  }  
//Read B hide show message
  this.leggiB=function(){
       return this.msB;
  }  
//Read A list  
this.prendilista=function(){
      return this.listaA;
  };
//Clear A list
this.clearlista=function(){
      this.listaA=[];
  };
//add element to B list
this.aggiungilistaB=function(n,q){
       this.listaB.push({nome:n,quantita:q});
};
//add element to Alist
this.aggiungilista=function(n,q){
       this.listaA.push({nome:n,quantita:q});
};
//Read B list
this.prendilistaB=function(){
      return this.listaB;
  };

});

//controller A
app.controller('Acontroller', function($scope,$rootScope, NuovaService) {
//read elements from A list
$scope.listaA=NuovaService.prendilista();
//read elements from B list
$scope.listaB=NuovaService.prendilistaB();
//read status hide show message
$rootScope.msgA=NuovaService.leggiA();

//this function remove elements from A list and add it to list B update message
    $scope.remove =function(alfa){
         var oldList=NuovaService.prendilista();;
         NuovaService.clearlista();
         angular.forEach(oldList,function(x){
            if(!(x.nome==alfa)){ 
                $scope.listaA=NuovaService.aggiungilista(x.nome,x.quantita);
            }else{
                $scope.listaB=NuovaService.aggiungilistaB(x.nome,x.quantita);
            }
         });
         $scope.listaA=NuovaService.prendilista();
         $scope.t=0;
         angular.forEach($scope.listaA,function(x){
           $scope.t=$scope.t+1;
         });
         

         //read elements into A list for message update
         var t=0;
         angular.forEach($scope.listaA,function(x){
           t=t+1;
         });
              if(t==0){
              $rootScope.msgB=true;
              }else{
              $rootScope.msgB=false;
              }
              $rootScope.msgA=false;
             
     }
});
//Controller B

app.controller('Bcontroller', function($scope,$rootScope, NuovaService) {

//update view B
   $scope.listaB=NuovaService.prendilistaB();
   $rootScope.msgB=NuovaService.leggiB();
});
