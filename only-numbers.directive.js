angular.module('myApp')
    .directive('mbOnlyNumber', function() {

        return {
            require: 'ngModel',
            link: function ($scope, elem, attrs, ngModel) {
                var decRegexp, intRegexp;

                intRegexp = /^(\d*)/;
                decRegexp = "^(\\d*(\\.|,)?(\\d{1,DECIMALS})?)";
                decRegexp = new RegExp(decRegexp.replace('DECIMALS', ''+attrs.decimalUpto));



                ngModel.$parsers.push(function (val) {

                    var isDec, parsed, ref, regexp;
                    isDec = attrs.numType === 'decimal';

                    regexp = isDec ? decRegexp : intRegexp;
                    parsed = val != null ? (ref = val.match(regexp)) != null ? ref[0] : void 0 : void 0;
                    ngModel.$setViewValue(parsed);
                    ngModel.$render();

                    if(isDec){

                        var result = parseFloat(parsed.replace(',', '.'));
                        if (attrs.minLimit > result) {
                            ngModel.$setValidity('smartFloatMin', false);
                            return undefined;
                        }else
                            ngModel.$setValidity('smartFloatMin', true);



                        if (attrs.maxLimit < result) {
                            ngModel.$setValidity('smartFloatMax', false);
                            return undefined;
                        }else
                            ngModel.$setValidity('smartFloatMax', true);
                    }else{
                        var result = parseInt(parsed);

                        if (attrs.minLimit > result) {
                            ngModel.$setValidity('smartIntegerMin', false);
                            return undefined;
                        }else
                            ngModel.$setValidity('smartIntegerMin', true);



                        if (attrs.maxLimit < result) {
                            ngModel.$setValidity('smartIntegerMax', false);
                            return undefined;
                        }else
                            ngModel.$setValidity('smartIntegerMax', true);
                    }


                    return result;
                });
                return elem.on('keypress', function (evt) {
                    if (!evt.key.match(/[0-9,.]/)) {
                        return evt.preventDefault();
                    }
                });
            }
        };
    });
