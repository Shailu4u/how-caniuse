'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.howcaniuse = undefined;

var _underscore = require('underscore');

var _ = _interopRequireWildcard(_underscore);

var _data = require('caniuse-db/data.json');

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dbError = function (_Error) {
    _inherits(dbError, _Error);

    function dbError(message) {
        _classCallCheck(this, dbError);

        return _possibleConstructorReturn(this, (dbError.__proto__ || Object.getPrototypeOf(dbError)).call(this, message));
    }

    return dbError;
}(Error);

//get complete supported features list from caniuse db


var featureList = _.keys(_data2.default.data); //length == 399

var isValidInput = function isValidInput(query) {
    if (!_.isString(query)) {
        throw new dbError("The search item should be a String");
    }
};

var getCompleteDataset = function getCompleteDataset() {
    return _data2.default.data;
};

//search for  feature name based on input query
var searchFeature = function searchFeature(query) {
    isValidInput(query);
    var str = new RegExp(query);
    var searchList = _.filter(featureList, function (item) {
        return str.test(item);
    });

    if (searchList.length) return searchList;else throw new dbError("No data found!");
};

var getVersion = function getVersion(stat, ch) {
    var obj = {};
    var filterStat = _.pick(stat, function (val, key) {
        return val.indexOf(ch) !== -1;
    });

    if (_.toArray(filterStat).length) {
        var bool = false;
        var newkeys = [];
        var keys = _.map(_.keys(filterStat), function (item) {
            if (item.indexOf("-") !== -1) {
                newkeys.push(parseFloat(item.split("-")[1], 10));
                item = item.split("-")[0];
            }
            if (!_.isNaN(parseFloat(item, 10))) return parseFloat(item, 10);else {
                bool = true;
                return item;
            }
        });

        keys = [].concat(_toConsumableArray(keys), newkeys);

        if (!bool) ch !== 'y' ? obj[ch] = _.max(keys) : obj[ch] = _.min(keys);else obj[ch] = _.find(keys, function (item) {
            return !_.isNumber(item);
        });
    }

    return obj;
};

//ask since which browser versions a feature is available
var getSupport = function getSupport(query) {
    var searchList = searchFeature(query);
    var resultList = [];

    _.each(searchList, function (item) {
        var title = _data2.default.data[item].title;
        var browsers = {};

        _.each(_data2.default.data[item].stats, function (stat, key) {
            browsers[key] = Object.assign({}, getVersion(stat, 'y'), getVersion(stat, 'n'), getVersion(stat, 'a'), getVersion(stat, 'x'), getVersion(stat, 'u'), getVersion(stat, 'p'), getVersion(stat, 'd'));
        });

        resultList.push({ title: title, browsers: browsers });
    });

    return resultList;
};

//find if a feature is supported by some browsers
var isSupported = function isSupported(query, browsers) {
    var searchList = searchFeature(query);
    if (!browsers) {
        throw new dbError("No browser info parameters!");
    }
    var browserList = browsers.split(",");
    var result = {};
    _.each(searchList, function (feature) {
        var obj = {};
        _.each(browserList, function (br) {
            br = br.trim().toLowerCase();
            if (br.indexOf(" ") === -1) return false;
            var _b$v = {
                b: br.split(" ")[0],
                v: br.split(" ")[1]
            },
                b = _b$v.b,
                v = _b$v.v;

            var d = _data2.default.data[feature].stats[b][v];
            if (!d) obj[br] = d;else obj[br] = _data2.default.data[feature].stats[b][v].split(" ")[0];
        });
        result[feature] = obj;
    });

    return result;
};

//get the latest version of all browsers
var getLatestStableBrowsers = function getLatestStableBrowsers() {
    var list = [];
    _.each(_data2.default.agents, function (agent) {
        list.push({ browser: agent.browser, type: agent.type, stableVersion: _.last(_.compact(agent.versions)) });
    });
    return list;
};

//returns a list of  all browsers available out there
var getBrowserScope = function getBrowserScope() {
    var browsersList = [];
    _.each(_data2.default.agents, function (agent) {
        browsersList.push({
            browser: agent.browser,
            prefix: agent.prefix,
            type: agent.type,
            versions: _.compact(agent.versions)
        });
    });
    return browsersList;
};

var howcaniuse = exports.howcaniuse = {
    searchFeature: searchFeature,
    getSupport: getSupport,
    getCompleteDataset: getCompleteDataset, //get complete info
    isSupported: isSupported, //Find if a feature is supported by some browsers
    getLatestStableBrowsers: getLatestStableBrowsers, //get the current version for each browser
    getBrowserScope: getBrowserScope
};