/**
 * Created by kidio on 2016. 10. 27..
 */
'use-strict';

angular
    .module('myApp')
    .factory('Item', function () {
        var self = this;

        self.init  = function(){
            return self = {
                name: '',
                a_speed: '',
                time_connected: '',
                enabled_xnsub : 0,
                difficult: 0,
                location: 1,
                unknown : 1
            };
        }

        self.set = function(object){
            return self = {
                name: object.name,
                a_speed: object.a_speed,
                time_connected: object.time_connected,
                enabled_xnsub : object.enabled_xnsub,
                difficult: object.difficult,
                location: object.location,
                unknown : object.unknown
            }
        }

        return self
    })


/*


{
  "result": {
    "addr": "1DHeNm1zZVpWj4DkYeQNaPCaEKqe1qPCK6",
    "workers": [
      [
        "M46", // name
        {
          "a": "14.07"  //speed object
        },
        86,  // time connected (min)
        1,  // 1 = xnsub enable
        "65536", // difficult
        2,  // connected to location
        1
      ]
    ],
    "algo": 1
  },
  "method": "stats.provider.workers"
}
 */