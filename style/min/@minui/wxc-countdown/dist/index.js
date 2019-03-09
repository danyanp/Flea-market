'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = Component({
  behaviors: [],
  properties: {
    countdown: {
      type: Number,
      value: 0,
      observer: 'init'
    },
    format: {
      type: String,
      value: 'dd天hh时mm分ss秒'
    },
    comStyle: {
      type: String,
      value: ''
    },
    numStyle: {
      type: String,
      value: ''
    },
    symbolStyle: {
      type: String,
      value: ''
    }
  },
  data: {
    computeTime: 0,
    endTimeMs: 0
  },
  detached: function detached() {
    this.onPageHide();
  },

  methods: {
    /**
     * Initialization
     */
    init: function init() {
      var _data = this.data,
          countdown = _data.countdown,
          format = _data.format;
      // countdown seconds

      this.computeTime = countdown;
      // time format
      this.format = format;

      var now = Date.now();
      // end timestamp (millisecond)
      this.endTimeMs = now + this.computeTime * 1000;

      this.initCountdown();
    },


    /**
     * timer
     */
    initCountdown: function initCountdown() {
      var _this = this;

      clearInterval(this._timer);

      var now = Date.now();
      // countdown milliseconds
      var computeTimeMs = this.endTimeMs - now;
      // countdown interval
      var timeout = computeTimeMs % 1000 || 0;

      this._timer = setTimeout(function () {
        _this.initCountdown();
      }, timeout);

      this.setCountdownTimeItems(computeTimeMs);
    },


    /**
     * set countdown seconds
     * @param  {Number} computeTimeMs - Countdown milliseconds
     */
    setCountdownTimeItems: function setCountdownTimeItems(computeTimeMs) {
      this.computeTime = parseInt(Math.ceil(computeTimeMs / 1000));
      this.emitRunCount(this.computeTime);

      if (this.computeTime <= 0) {
        clearInterval(this._timer);
        this.emitEndCount();
      }

      var timeItems = this.getTimeItems(this.computeTime, this.format);
      this.setData({
        timeItems: timeItems
      });
    },


    /**
     * get rendering data
     * @param  {Number} computeTime - countdown seconds
     * @param  {String} format - time format
     * @return {Array} rendering data
     */
    getTimeItems: function getTimeItems(computeTime, format) {
      if (computeTime < 0) {
        computeTime = 0;
      }
      var arr = format.match(/[a-zA-Z]{1,3}/g) || [];
      var symbolArr = format.match(/[\u4e00-\u9fa5]+|[^a-zA-Z]/g) || [];
      var time = this.getTime(computeTime, format);
      return arr.map(function (item, i) {
        return {
          num: time[item],
          symbol: symbolArr[i]
        };
      });
    },


    /**
     * get countdown object
     * @param  {Number} leftseconds - countdown seconds
     * @param  {String} format - time format
     * @return {Object} separated countdown seconds width d, h, m, s
     */
    getTime: function getTime(leftseconds, format) {
      var d = leftseconds;

      var _map = [60, 60, 24].map(function (unit) {
        var num = d % unit;
        d = Math.floor(d / unit);
        return num;
      }),
          _map2 = _slicedToArray(_map, 3),
          s = _map2[0],
          m = _map2[1],
          h = _map2[2];

      if (leftseconds > 86400 && format.indexOf('d') === -1) {
        h += d * 24;
      }

      if (leftseconds > 3600 && format.indexOf('h') === -1) {
        m += h * 60;
      }

      if (leftseconds > 60 && format.indexOf('m') === -1) {
        s += m * 60;
      }

      return {
        dd: this.formatTime(d),
        hh: this.formatTime(h),
        mm: this.formatTime(m),
        ss: this.formatTime(s),
        d: d,
        h: h,
        m: m,
        s: s
      };
    },


    /**
     * zero padding
     * @param  {Number} val - number
     * @return {Number|String} the number after zero padding
     */
    formatTime: function formatTime(val) {
      return val < 10 ? '0' + val : val;
    },


    /**
     * timing callback
     */
    emitRunCount: function emitRunCount() {
      this.triggerEvent('runcount', {
        computeTime: this.computeTime
      });
    },


    /**
     * end callback
     */
    emitEndCount: function emitEndCount() {
      this.triggerEvent('endcount');
    },
    onPageShow: function onPageShow() {
      var now = Date.now();
      if (this.format && this.endTimeMs) {
        this.computeTime = parseInt((this.endTimeMs - now) / 1000);
        this.initCountdown();
      }
    },
    onPageHide: function onPageHide() {
      clearInterval(this._timer);
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4YyJdLCJuYW1lcyI6WyJiZWhhdmlvcnMiLCJwcm9wZXJ0aWVzIiwiY291bnRkb3duIiwidHlwZSIsIk51bWJlciIsInZhbHVlIiwib2JzZXJ2ZXIiLCJmb3JtYXQiLCJTdHJpbmciLCJjb21TdHlsZSIsIm51bVN0eWxlIiwic3ltYm9sU3R5bGUiLCJkYXRhIiwiY29tcHV0ZVRpbWUiLCJlbmRUaW1lTXMiLCJkZXRhY2hlZCIsIm9uUGFnZUhpZGUiLCJtZXRob2RzIiwiaW5pdCIsIm5vdyIsIkRhdGUiLCJpbml0Q291bnRkb3duIiwiY2xlYXJJbnRlcnZhbCIsIl90aW1lciIsImNvbXB1dGVUaW1lTXMiLCJ0aW1lb3V0Iiwic2V0VGltZW91dCIsInNldENvdW50ZG93blRpbWVJdGVtcyIsInBhcnNlSW50IiwiTWF0aCIsImNlaWwiLCJlbWl0UnVuQ291bnQiLCJlbWl0RW5kQ291bnQiLCJ0aW1lSXRlbXMiLCJnZXRUaW1lSXRlbXMiLCJzZXREYXRhIiwiYXJyIiwibWF0Y2giLCJzeW1ib2xBcnIiLCJ0aW1lIiwiZ2V0VGltZSIsIm1hcCIsIml0ZW0iLCJpIiwibnVtIiwic3ltYm9sIiwibGVmdHNlY29uZHMiLCJkIiwidW5pdCIsImZsb29yIiwicyIsIm0iLCJoIiwiaW5kZXhPZiIsImRkIiwiZm9ybWF0VGltZSIsImhoIiwibW0iLCJzcyIsInZhbCIsInRyaWdnZXJFdmVudCIsIm9uUGFnZVNob3ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUlFQSxhQUFXLEU7QUFDWEMsY0FBWTtBQUNWQyxlQUFXO0FBQ1RDLFlBQU1DLE1BREc7QUFFVEMsYUFBTyxDQUZFO0FBR1RDLGdCQUFVO0FBSEQsS0FERDtBQU1WQyxZQUFRO0FBQ05KLFlBQU1LLE1BREE7QUFFTkgsYUFBTztBQUZELEtBTkU7QUFVVkksY0FBVTtBQUNSTixZQUFNSyxNQURFO0FBRVJILGFBQU87QUFGQyxLQVZBO0FBY1ZLLGNBQVU7QUFDUlAsWUFBTUssTUFERTtBQUVSSCxhQUFP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SU8sd0JBNElNO0FBQ1gsVUFBTTFDLE1BQU1DLEtBQUtELEdBQUwsRUFBWjtBQUNBLFVBQUksS0FBS1osTUFBTCxJQUFlLEtBQUtPLFNBQXhCLEVBQW1DO0FBQ2pDLGFBQUtELFdBQUwsR0FBbUJlLFNBQVMsQ0FBQyxLQUFLZCxTQUFMLEdBQWlCSyxHQUFsQixJQUF5QixJQUFsQyxDQUFuQjtBQUNBLGFBQUtFLGFBQUw7QUFDRDtBQUNGLEtBbEpNO0FBb0pQTCxjQXBKTyx3QkFvSk07QUFDWE0sb0JBQWMsS0FBS0MsTUFBbkI7QUFDRDtBQXRKTSIsImZpbGUiOiJpbmRleC53eGMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG4gIGNvbmZpZzoge1xuICAgIHVzaW5nQ29tcG9uZW50czoge31cbiAgfSxcbiAgYmVoYXZpb3JzOiBbXSxcbiAgcHJvcGVydGllczoge1xuICAgIGNvdW50ZG93bjoge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgdmFsdWU6IDAsXG4gICAgICBvYnNlcnZlcjogJ2luaXQnXG4gICAgfSxcbiAgICBmb3JtYXQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbHVlOiAnZGTlpKloaOaXtm1t5YiGc3Pnp5InXG4gICAgfSxcbiAgICBjb21TdHlsZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsdWU6ICcnXG4gICAgfSxcbiAgICBudW1TdHlsZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsdWU6ICcnXG4gICAgfSxcbiAgICBzeW1ib2xTdHlsZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsdWU6ICcnXG4gICAgfVxuICB9LFxuICBkYXRhOiB7XG4gICAgY29tcHV0ZVRpbWU6IDAsXG4gICAgZW5kVGltZU1zOiAwXG4gIH0sXG4gIGRldGFjaGVkICgpIHtcbiAgICB0aGlzLm9uUGFnZUhpZGUoKVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6YXRpb25cbiAgICAgKi9cbiAgICBpbml0KCkge1xuICAgICAgbGV0IHtjb3VudGRvd24sIGZvcm1hdH0gPSB0aGlzLmRhdGE7XG4gICAgICAvLyBjb3VudGRvd24gc2Vjb25kc1xuICAgICAgdGhpcy5jb21wdXRlVGltZSA9IGNvdW50ZG93bjtcbiAgICAgIC8vIHRpbWUgZm9ybWF0XG4gICAgICB0aGlzLmZvcm1hdCA9IGZvcm1hdDtcblxuICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgIC8vIGVuZCB0aW1lc3RhbXAgKG1pbGxpc2Vjb25kKVxuICAgICAgdGhpcy5lbmRUaW1lTXMgPSBub3cgKyB0aGlzLmNvbXB1dGVUaW1lICogMTAwMDtcblxuICAgICAgdGhpcy5pbml0Q291bnRkb3duKClcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogdGltZXJcbiAgICAgKi9cbiAgICBpbml0Q291bnRkb3duKCkge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl90aW1lcik7XG5cbiAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAvLyBjb3VudGRvd24gbWlsbGlzZWNvbmRzXG4gICAgICBsZXQgY29tcHV0ZVRpbWVNcyA9IHRoaXMuZW5kVGltZU1zIC0gbm93O1xuICAgICAgLy8gY291bnRkb3duIGludGVydmFsXG4gICAgICBsZXQgdGltZW91dCA9IGNvbXB1dGVUaW1lTXMgJSAxMDAwIHx8IDA7XG5cbiAgICAgIHRoaXMuX3RpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgIHRoaXMuaW5pdENvdW50ZG93bigpO1xuICAgICAgfSwgdGltZW91dClcblxuICAgICAgdGhpcy5zZXRDb3VudGRvd25UaW1lSXRlbXMoY29tcHV0ZVRpbWVNcyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHNldCBjb3VudGRvd24gc2Vjb25kc1xuICAgICAqIEBwYXJhbSAge051bWJlcn0gY29tcHV0ZVRpbWVNcyAtIENvdW50ZG93biBtaWxsaXNlY29uZHNcbiAgICAgKi9cbiAgICBzZXRDb3VudGRvd25UaW1lSXRlbXMoY29tcHV0ZVRpbWVNcykge1xuICAgICAgdGhpcy5jb21wdXRlVGltZSA9IHBhcnNlSW50KE1hdGguY2VpbChjb21wdXRlVGltZU1zIC8gMTAwMCkpO1xuICAgICAgdGhpcy5lbWl0UnVuQ291bnQodGhpcy5jb21wdXRlVGltZSk7XG5cbiAgICAgIGlmICh0aGlzLmNvbXB1dGVUaW1lIDw9IDApIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl90aW1lcik7XG4gICAgICAgIHRoaXMuZW1pdEVuZENvdW50KCk7XG4gICAgICB9XG5cbiAgICAgIGxldCB0aW1lSXRlbXMgPSB0aGlzLmdldFRpbWVJdGVtcyh0aGlzLmNvbXB1dGVUaW1lLCB0aGlzLmZvcm1hdCk7XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICB0aW1lSXRlbXNcbiAgICAgIH0pXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGdldCByZW5kZXJpbmcgZGF0YVxuICAgICAqIEBwYXJhbSAge051bWJlcn0gY29tcHV0ZVRpbWUgLSBjb3VudGRvd24gc2Vjb25kc1xuICAgICAqIEBwYXJhbSAge1N0cmluZ30gZm9ybWF0IC0gdGltZSBmb3JtYXRcbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gcmVuZGVyaW5nIGRhdGFcbiAgICAgKi9cbiAgICBnZXRUaW1lSXRlbXMoY29tcHV0ZVRpbWUsIGZvcm1hdCkge1xuICAgICAgaWYgKGNvbXB1dGVUaW1lIDwgMCkge1xuICAgICAgICBjb21wdXRlVGltZSA9IDA7XG4gICAgICB9XG4gICAgICBsZXQgYXJyID0gZm9ybWF0Lm1hdGNoKC9bYS16QS1aXXsxLDN9L2cpIHx8IFtdO1xuICAgICAgbGV0IHN5bWJvbEFyciA9IGZvcm1hdC5tYXRjaCgvW1xcdTRlMDAtXFx1OWZhNV0rfFteYS16QS1aXS9nKSB8fCBbXTtcbiAgICAgIGxldCB0aW1lID0gdGhpcy5nZXRUaW1lKGNvbXB1dGVUaW1lLCBmb3JtYXQpO1xuICAgICAgcmV0dXJuIGFyci5tYXAoKGl0ZW0sIGkpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBudW06IHRpbWVbaXRlbV0sXG4gICAgICAgICAgc3ltYm9sOiBzeW1ib2xBcnJbaV0sXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGdldCBjb3VudGRvd24gb2JqZWN0XG4gICAgICogQHBhcmFtICB7TnVtYmVyfSBsZWZ0c2Vjb25kcyAtIGNvdW50ZG93biBzZWNvbmRzXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBmb3JtYXQgLSB0aW1lIGZvcm1hdFxuICAgICAqIEByZXR1cm4ge09iamVjdH0gc2VwYXJhdGVkIGNvdW50ZG93biBzZWNvbmRzIHdpZHRoIGQsIGgsIG0sIHNcbiAgICAgKi9cbiAgICBnZXRUaW1lKGxlZnRzZWNvbmRzLCBmb3JtYXQpIHtcbiAgICAgIGxldCBkID0gbGVmdHNlY29uZHM7XG4gICAgICBsZXQgW3MsIG0sIGhdID0gWzYwLCA2MCwgMjRdLm1hcCgodW5pdCkgPT4ge1xuICAgICAgICBsZXQgbnVtID0gZCAlIHVuaXQ7XG4gICAgICAgIGQgPSBNYXRoLmZsb29yKGQgLyB1bml0KTtcbiAgICAgICAgcmV0dXJuIG51bTtcbiAgICAgIH0pXG5cbiAgICAgIGlmIChsZWZ0c2Vjb25kcyA+IDg2NDAwICYmIGZvcm1hdC5pbmRleE9mKCdkJykgPT09IC0xKSB7XG4gICAgICAgIGggKz0gZCAqIDI0O1xuICAgICAgfVxuXG4gICAgICBpZiAobGVmdHNlY29uZHMgPiAzNjAwICYmIGZvcm1hdC5pbmRleE9mKCdoJykgPT09IC0xKSB7XG4gICAgICAgIG0gKz0gaCAqIDYwO1xuICAgICAgfVxuXG4gICAgICBpZiAobGVmdHNlY29uZHMgPiA2MCAmJiBmb3JtYXQuaW5kZXhPZignbScpID09PSAtMSkge1xuICAgICAgICBzICs9IG0gKiA2MDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZGQ6IHRoaXMuZm9ybWF0VGltZShkKSxcbiAgICAgICAgaGg6IHRoaXMuZm9ybWF0VGltZShoKSxcbiAgICAgICAgbW06IHRoaXMuZm9ybWF0VGltZShtKSxcbiAgICAgICAgc3M6IHRoaXMuZm9ybWF0VGltZShzKSxcbiAgICAgICAgZCxcbiAgICAgICAgaCxcbiAgICAgICAgbSxcbiAgICAgICAgc1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiB6ZXJvIHBhZGRpbmdcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHZhbCAtIG51bWJlclxuICAgICAqIEByZXR1cm4ge051bWJlcnxTdHJpbmd9IHRoZSBudW1iZXIgYWZ0ZXIgemVybyBwYWRkaW5nXG4gICAgICovXG4gICAgZm9ybWF0VGltZSh2YWwpIHtcbiAgICAgIHJldHVybiB2YWwgPCAxMCA/IGAwJHt2YWx9YCA6IHZhbDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogdGltaW5nIGNhbGxiYWNrXG4gICAgICovXG4gICAgZW1pdFJ1bkNvdW50KCkge1xuICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoJ3J1bmNvdW50Jywge1xuICAgICAgICBjb21wdXRlVGltZTogdGhpcy5jb21wdXRlVGltZVxuICAgICAgfSlcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogZW5kIGNhbGxiYWNrXG4gICAgICovXG4gICAgZW1pdEVuZENvdW50KCkge1xuICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoJ2VuZGNvdW50Jyk7XG4gICAgfSxcblxuICAgIG9uUGFnZVNob3coKSB7XG4gICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgaWYgKHRoaXMuZm9ybWF0ICYmIHRoaXMuZW5kVGltZU1zKSB7XG4gICAgICAgIHRoaXMuY29tcHV0ZVRpbWUgPSBwYXJzZUludCgodGhpcy5lbmRUaW1lTXMgLSBub3cpIC8gMTAwMCk7XG4gICAgICAgIHRoaXMuaW5pdENvdW50ZG93bigpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBvblBhZ2VIaWRlKCkge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl90aW1lcik7XG4gICAgfVxuICB9XG59Il19