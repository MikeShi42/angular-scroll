angular.module('duScroll.smoothScroll', ['duScroll.scrollHelpers', 'duScroll.scrollContainerAPI'])
.directive('duSmoothScroll', function(duScrollDuration, scrollContainerAPI){
  'use strict';

  return {
    link : function($scope, $element, $attr){
      $element.on('click', function(e){
        if(!$attr.href || $attr.href.indexOf('#') === -1) return;
        var target = document.getElementById($attr.href.replace(/.*(?=#[^\s]+$)/, '').substring(1));
        if(!target || !target.getBoundingClientRect) return;
        
        if (e.stopPropagation) e.stopPropagation();
        if (e.preventDefault) e.preventDefault();

        var offset = ($attr.offset ? parseInt($attr.offset, 10) : 0);
        var duration = $attr.duration ? parseInt($attr.duration, 10) : duScrollDuration;
        var container = scrollContainerAPI.getContainer($scope);

        container.scrollToElement(
          angular.element(target), 
          isNaN(offset) ? 0 : offset, 
          isNaN(duration) ? 0 : duration
        );
      });
    }
  };
});
