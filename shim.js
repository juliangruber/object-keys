(function () {
	"use strict";

	// modified from https://github.com/kriskowal/es5-shim
	var has = Object.prototype.hasOwnProperty,
		is = require('is'),
		forEach = require('foreach'),
		hasDontEnumBug = true,
		dontEnums = [
			"toString",
			"toLocaleString",
			"valueOf",
			"hasOwnProperty",
			"isPrototypeOf",
			"propertyIsEnumerable",
			"constructor"
		],
		key, keysShim;
	for (key in {"toString": null}) { hasDontEnumBug = false; }

	keysShim = function keys(object) {
		if (!is.object(object)) {
			throw new TypeError("Object.keys called on a non-object");
		}

		var name, theKeys = [];
		for (name in object) {
			if (has.call(object, name)) {
				theKeys.push(name);
			}
		}

		if (hasDontEnumBug) {
			forEach(dontEnums, function (dontEnum) {
				if (has.call(dontEnums, dontEnum)) {
					theKeys.push(dontEnum);
				}
			});
		}
		return theKeys;
	};

	module.exports = keysShim;
}());

