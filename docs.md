'use strict';
/*!
 * grpc-middleware
 */
var __extends = (this && this.__extends) || (function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
      function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
  }
  return function (d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();
function __export(m) {
  for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
var grpc_1 = __importDefault(require('grpc'));
__export(require('grpc'));
var Server = /** @class */ (function (_super) {
  __extends(Server, _super);
  /**
     * Constructs a server object that stores request handlers and delegates
     * incoming requests to those handlers
     * @param options Options that should be passed to the internal server implementation
     * @param preHandler Optional method to be invoked prior to the actual service handler
     * @param postHandler Optional method to be invoked after the actual service handler, and before returning the result
     * ```
     * var server = new grpc.Server();
     * server.addProtoService(protobuf_service_descriptor, service_implementation);
     * server.bind('address:port', server_credential);
     * server.start();
     * ```
     */
  function Server(options, preHandler, postHandler) {
    var _this = _super.call(this, options) || this;
    _this.services = [];
    _this.middlewares = [];
    if (preHandler) { _this.preHandler = preHandler; }
    if (postHandler) { _this.postHandler = postHandler; }
    return _this;
  }
  /**
     * Add a service to the server, with a corresponding implementation.
     * @param service The service descriptor
     * @param implementation Map of method names to method implementation for the provided service.
     * @param middleware Either a middleware function to be called for every method in the service, or a mapping of
     * function names to a specific middleware function
     */
  Server.prototype.addService = function (service, implementation, middleware) {
    var _this = this;
    var proxies = {};
    var _loop_1 = function (key) {
      proxies[key] = function (call, callback) {
        if (middleware) {
          if (middleware && typeof middleware === 'function') {
            // middleware is a MiddlewareHandler
            _this.handler(call, callback, implementation[key], middleware, key);
          } else {
            // middleware is a MiddlewareHandlerMap
            // Use implementation key to identify the correct function to call
            _this.handler(call, callback, implementation[key], middleware[key], key);
          }
        } else {
          _this.handler(call, callback, implementation[key], null, key);
        }
      };
    };
    for (var key in implementation) {
      _loop_1(key);
    }
    _super.prototype.addService.call(this, service, proxies);
  };
  Server.prototype.handler = function (call, callback, implementation, middleware, method) {
    var _this = this;
    var context = {};
    context.method = method;
    var postHandlerCalled = false;
    try {
      if (this.preHandler) {
        this.preHandler(context, call);
      }
      if (middleware) {
        middleware(context, call);
      }
      implementation(call, function (err, response) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
          args[_i - 1] = arguments[_i];
        }
        if (_this.postHandler) {
          postHandlerCalled = true;
          _this.postHandler(err, response, context, call, callback);
        }
        callback.apply(void 0, [err].concat(args));
      });
    } catch (err) {
      if (!postHandlerCalled && this.postHandler) {
        this.postHandler(err, context, call);
      }
      callback(err, null);
    }
  };
  return Server;
}(grpc_1.default.Server));
exports.Server = Server;
