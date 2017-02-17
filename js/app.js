/*! angularjs-slider - v0.1.2 - (c) Rafal Zajac <rzajac@gmail.com>, https://github.com/rzajac/angularjs-slider.git - 2013-12-16 */
angular.module("rzModule",[]).value("throttle",function(a,b,c){var d,e,f,g=Date.now||function(){return(new Date).getTime()},h=null,i=0;c||(c={});var j=function(){i=c.leading===!1?0:g(),h=null,f=a.apply(d,e),d=e=null};return function(){var k=g();i||c.leading!==!1||(i=k);var l=b-(k-i);return d=this,e=arguments,0>=l?(clearTimeout(h),h=null,i=k,f=a.apply(d,e),d=e=null):h||c.trailing===!1||(h=setTimeout(j,l)),f}}).factory("Slider",["$timeout","$document","throttle",function(a,b,c){var d=function(a,b,c){this.scope=a,this.attributes=c,this.sliderElem=b,this.range=void 0!==c.rzSliderHigh&&void 0!==c.rzSliderModel,this.handleHalfWidth=0,this.maxLeft=0,this.precision=0,this.step=0,this.tracking="",this.minValue=0,this.maxValue=0,this.valueRange=0,this.initRun=!1,this.customTrFn=null,this.fullBar=null,this.selBar=null,this.minH=null,this.maxH=null,this.flrLab=null,this.ceilLab=null,this.minLab=null,this.maxLab=null,this.cmbLab=null,this.init()};return d.prototype={init:function(){var b=this;this.scope.rzSliderTranslate&&(this.customTrFn=this.scope.rzSliderTranslate()),this.initElemHandles(),this.calcViewDimensions(),this.setMinAndMax(),this.precision=void 0===this.scope.rzSliderPrecision?0:+this.scope.rzSliderPrecision,this.step=void 0===this.scope.rzSliderStep?1:+this.scope.rzSliderStep,a(function(){b.updateCeilLab(),b.updateFloorLab(),b.initHandles(),b.bindEvents()}),angular.element(window).on("resize",angular.bind(this,this.calcViewDimensions)),this.initRun=!0;var d=c(function(){b.setMinAndMax(),b.updateLowHandle(b.valueToOffset(b.scope.rzSliderModel)),b.range&&(b.updateSelectionBar(),b.updateCmbLabel())},350,{leading:!1}),e=c(function(){b.setMinAndMax(),b.updateHighHandle(b.valueToOffset(b.scope.rzSliderHigh)),b.updateSelectionBar(),b.updateCmbLabel()},350,{leading:!1});this.scope.$watch("rzSliderModel",function(a,b){a!==b&&d()}),this.scope.$watch("rzSliderHigh",function(a,b){a!==b&&e()})},initHandles:function(){this.updateLowHandle(this.valueToOffset(this.scope.rzSliderModel)),this.range&&(this.updateHighHandle(this.valueToOffset(this.scope.rzSliderHigh)),this.updateSelectionBar(),this.updateCmbLabel())},translateFn:function(a,b,c){c=void 0===c?!0:c;var d=this.customTrFn&&c?""+this.customTrFn(a):""+a,e=!1;(void 0===b.rzsv||b.rzsv.length!=d.length)&&(e=!0,b.rzsv=d),b.text(d),e&&this.getWidth(b)},setMinAndMax:function(){this.minValue=this.scope.rzSliderFloor?+this.scope.rzSliderFloor:this.scope.rzSliderFloor=0,this.scope.rzSliderCeil?this.maxValue=+this.scope.rzSliderCeil:this.scope.rzSliderCeil=this.maxValue=this.range?this.scope.rzSliderHigh:this.scope.rzSliderModel,this.valueRange=this.maxValue-this.minValue},initElemHandles:function(){angular.forEach(this.sliderElem.children(),function(a,b){var c=angular.element(a);switch(b){case 0:this.fullBar=c;break;case 1:this.selBar=c;break;case 2:this.minH=c;break;case 3:this.maxH=c;break;case 4:this.flrLab=c;break;case 5:this.ceilLab=c;break;case 6:this.minLab=c;break;case 7:this.maxLab=c;break;case 8:this.cmbLab=c}},this),this.fullBar.rzsl=0,this.selBar.rzsl=0,this.minH.rzsl=0,this.maxH.rzsl=0,this.flrLab.rzsl=0,this.ceilLab.rzsl=0,this.minLab.rzsl=0,this.maxLab.rzsl=0,this.cmbLab.rzsl=0,this.range||(this.cmbLab.remove(),this.maxLab.remove(),this.maxH.remove(),this.selBar.remove())},calcViewDimensions:function(){var a=this.getWidth(this.minH);this.handleHalfWidth=a/2,this.barWidth=this.getWidth(this.fullBar),this.maxLeft=this.barWidth-a,this.getWidth(this.sliderElem),this.sliderElem.rzsl=this.sliderElem[0].getBoundingClientRect().left,this.initRun&&(this.updateCeilLab(),this.initHandles())},updateCeilLab:function(){this.translateFn(this.scope.rzSliderCeil,this.ceilLab),this.setLeft(this.ceilLab,this.barWidth-this.ceilLab.rzsw),this.getWidth(this.ceilLab)},updateFloorLab:function(){this.translateFn(this.scope.rzSliderFloor,this.flrLab),this.getWidth(this.flrLab)},updateHandles:function(a,b){return"rzSliderModel"===a?(this.updateLowHandle(b),this.range&&(this.updateSelectionBar(),this.updateCmbLabel()),void 0):"rzSliderHigh"===a?(this.updateHighHandle(b),this.range&&(this.updateSelectionBar(),this.updateCmbLabel()),void 0):(this.updateLowHandle(b),this.updateHighHandle(b),this.updateSelectionBar(),this.updateCmbLabel(),void 0)},updateLowHandle:function(a){this.setLeft(this.minH,a),this.translateFn(this.scope.rzSliderModel,this.minLab),this.setLeft(this.minLab,a-this.minLab.rzsw/2+this.handleHalfWidth),this.shFloorCeil()},updateHighHandle:function(a){this.setLeft(this.maxH,a),this.translateFn(this.scope.rzSliderHigh,this.maxLab),this.setLeft(this.maxLab,a-this.maxLab.rzsw/2+this.handleHalfWidth),this.shFloorCeil()},shFloorCeil:function(){var a=!1,b=!1;this.minLab.rzsl<=this.flrLab.rzsl+this.flrLab.rzsw+5?(a=!0,this.hideEl(this.flrLab)):(a=!1,this.showEl(this.flrLab)),this.minLab.rzsl+this.minLab.rzsw>=this.ceilLab.rzsl-this.handleHalfWidth-10?(b=!0,this.hideEl(this.ceilLab)):(b=!1,this.showEl(this.ceilLab)),this.range&&(this.maxLab.rzsl+this.maxLab.rzsw>=this.ceilLab.rzsl-10?this.hideEl(this.ceilLab):b||this.showEl(this.ceilLab),this.maxLab.rzsl<=this.flrLab.rzsl+this.flrLab.rzsw+this.handleHalfWidth?this.hideEl(this.flrLab):a||this.showEl(this.flrLab))},updateSelectionBar:function(){this.setWidth(this.selBar,this.maxH.rzsl-this.minH.rzsl),this.setLeft(this.selBar,this.minH.rzsl+this.handleHalfWidth)},updateCmbLabel:function(){var a,b;this.minLab.rzsl+this.minLab.rzsw+10>=this.maxLab.rzsl?(this.customTrFn?(a=this.customTrFn(this.scope.rzSliderModel),b=this.customTrFn(this.scope.rzSliderHigh)):(a=this.scope.rzSliderModel,b=this.scope.rzSliderHigh),this.translateFn(a+" - "+b,this.cmbLab,!1),this.setLeft(this.cmbLab,this.selBar.rzsl+this.selBar.rzsw/2-this.cmbLab.rzsw/2),this.hideEl(this.minLab),this.hideEl(this.maxLab),this.showEl(this.cmbLab)):(this.showEl(this.maxLab),this.showEl(this.minLab),this.hideEl(this.cmbLab))},roundStep:function(a){var b=this.step,c=(a-this.minValue)%b,d=c>b/2?a+b-c:a-c;return+d.toFixed(this.precision)},hideEl:function(a){return a.css({opacity:0})},showEl:function(a){return a.css({opacity:1})},setLeft:function(a,b){return a.rzsl=b,a.css({left:b+"px"}),b},getWidth:function(a){var b=a[0].getBoundingClientRect();return a.rzsw=b.right-b.left,a.rzsw},setWidth:function(a,b){return a.rzsw=b,a.css({width:b+"px"}),b},valueToOffset:function(a){return(a-this.minValue)*this.maxLeft/this.valueRange},offsetToValue:function(a){return a/this.maxLeft*this.valueRange+this.minValue},bindEvents:function(){this.minH.on("mousedown",angular.bind(this,this.onStart,this.minH,"rzSliderModel")),this.range&&this.maxH.on("mousedown",angular.bind(this,this.onStart,this.maxH,"rzSliderHigh")),this.minH.on("touchstart",angular.bind(this,this.onStart,this.minH,"rzSliderModel")),this.range&&this.maxH.on("touchstart",angular.bind(this,this.onStart,this.maxH,"rzSliderHigh"))},onStart:function(a,c,d){d.stopPropagation(),d.preventDefault(),""===this.tracking&&(this.calcViewDimensions(),this.tracking=c,a.addClass("active"),d.touches?(b.on("touchmove",angular.bind(this,this.onMove,a)),b.on("touchend",angular.bind(this,this.onEnd))):(b.on("mousemove",angular.bind(this,this.onMove,a)),b.on("mouseup",angular.bind(this,this.onEnd))))},onMove:function(a,b){var c,d=b.clientX||b.touches[0].clientX,e=this.sliderElem.rzsl,f=d-e-this.handleHalfWidth;return 0>=f?(0!==a.rzsl&&(this.scope[this.tracking]=this.minValue,this.updateHandles(this.tracking,0),this.scope.$apply()),void 0):f>=this.maxLeft?(a.rzsl!==this.maxLeft&&(this.scope[this.tracking]=this.maxValue,this.updateHandles(this.tracking,this.maxLeft),this.scope.$apply()),void 0):(c=this.offsetToValue(f),c=this.roundStep(c),this.range&&("rzSliderModel"===this.tracking&&c>=this.scope.rzSliderHigh?(this.scope[this.tracking]=this.scope.rzSliderHigh,this.updateHandles(this.tracking,this.maxH.rzsl),this.tracking="rzSliderHigh",this.minH.removeClass("active"),this.maxH.addClass("active")):"rzSliderHigh"===this.tracking&&c<=this.scope.rzSliderModel&&(this.scope[this.tracking]=this.scope.rzSliderModel,this.updateHandles(this.tracking,this.minH.rzsl),this.tracking="rzSliderModel",this.maxH.removeClass("active"),this.minH.addClass("active"))),this.scope[this.tracking]!==c&&(this.scope[this.tracking]=c,this.updateHandles(this.tracking,f),this.scope.$apply()),void 0)},onEnd:function(a){this.minH.removeClass("active"),this.maxH.removeClass("active"),a.touches?(b.unbind("touchmove"),b.unbind("touchend")):(b.unbind("mousemove"),b.unbind("mouseup")),this.tracking=""}},d}]).directive("rzslider",["Slider",function(a){return{restrict:"EA",scope:{rzSliderFloor:"=?",rzSliderCeil:"=?",rzSliderStep:"@",rzSliderPrecision:"@",rzSliderModel:"=?",rzSliderHigh:"=?",rzSliderTranslate:"&"},template:'<span class="bar"></span><span class="bar selection"></span><span class="pointer"></span><span class="pointer"></span><span class="bubble limit"></span><span class="bubble limit"></span><span class="bubble"></span><span class="bubble"></span><span class="bubble"></span>',link:function(b,c,d){return new a(b,c,d)}}}]);



var app = angular.module('myShop', ['rzModule']);

app.controller('cargarProductos',function($scope,$http, Data){
var carri=[];
$scope.elementoCarrito=0;
console.log("CARGAR PRODCUTOS");
	$scope.priceSlider = {
    min: 3000,
    max: 200000,
    ceil: 200000,
    floor: 1000,
    step: 1000
  };  

  $scope.addItem = function(e) {
    var elem = angular.element(e.srcElement).attr("value");
    for (var i = 0; i < $scope.productos.products.length; i++) {
      if($scope.productos.products[i].id==elem){
          Data.setCarrito($scope.productos.products[i]);
        break;
      }
    };
    $scope.elementoCarrito++;
    console.log(Data.getCarrito());
  }

  $scope.removeItem = function(e) {
    var elem = angular.element(e.srcElement).attr("value");
    Data.removeItem(elem);
    $scope.elementoCarrito--;
    
  }

  $scope.showItems = function(){
    $scope.carro=Data.getCarrito();
    console.log("showItems ");
    console.log($scope.carro);
  }


  $scope.importar= function(){
    
    $http.get('./dataParcial.json').success(function(datos){
     $scope.productos=datos;
     
      $scope.minFilter = function (datos) {
      
        return (Number(datos.price)*1000) >= $scope.priceSlider.min;
      };

      $scope.maxFilter = function (datos) {
      
        return (Number(datos.price)*1000) <= $scope.priceSlider.max;
      };
    });
  }

  $scope.importar();
});






app.factory('Data', function(){
    // I know this doesn't work, but what will?
    var carrito=[];

    return {
        getCarrito: function () {
            return carrito;
        },
        setCarrito: function (item) {
            carrito.push(item);
        },
        removeItem: function(item){
          var pos=-1;
            for (var i = 0; i < carrito.length; i++) {
              if(carrito[i].id==item){
                pos=i;
                break;
              }
            };
            carrito.splice(pos, 1);
        }
    };
});
