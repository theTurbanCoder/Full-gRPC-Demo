/**
 * @fileoverview gRPC-Web generated client stub for fullDuplexTest
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.fullDuplexTest = require('./echo_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.fullDuplexTest.TestDuplexServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.fullDuplexTest.TestDuplexServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.fullDuplexTest.EchoRequest,
 *   !proto.fullDuplexTest.EchoResponse>}
 */
const methodInfo_TestDuplexService_Echo = new grpc.web.AbstractClientBase.MethodInfo(
  proto.fullDuplexTest.EchoResponse,
  /** @param {!proto.fullDuplexTest.EchoRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.fullDuplexTest.EchoResponse.deserializeBinary
);


/**
 * @param {!proto.fullDuplexTest.EchoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.fullDuplexTest.EchoResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.fullDuplexTest.EchoResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.fullDuplexTest.TestDuplexServiceClient.prototype.echo =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fullDuplexTest.TestDuplexService/Echo',
      request,
      metadata || {},
      methodInfo_TestDuplexService_Echo,
      callback);
};


/**
 * @param {!proto.fullDuplexTest.EchoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.fullDuplexTest.EchoResponse>}
 *     A native promise that resolves to the response
 */
proto.fullDuplexTest.TestDuplexServicePromiseClient.prototype.echo =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fullDuplexTest.TestDuplexService/Echo',
      request,
      metadata || {},
      methodInfo_TestDuplexService_Echo);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.fullDuplexTest.FullDuplexRequest,
 *   !proto.fullDuplexTest.FullDuplexResponse>}
 */
const methodInfo_TestDuplexService_send = new grpc.web.AbstractClientBase.MethodInfo(
  proto.fullDuplexTest.FullDuplexResponse,
  /** @param {!proto.fullDuplexTest.FullDuplexRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.fullDuplexTest.FullDuplexResponse.deserializeBinary
);


/**
 * @param {!proto.fullDuplexTest.FullDuplexRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.fullDuplexTest.FullDuplexResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.fullDuplexTest.FullDuplexResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.fullDuplexTest.TestDuplexServiceClient.prototype.send =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/fullDuplexTest.TestDuplexService/send',
      request,
      metadata || {},
      methodInfo_TestDuplexService_send,
      callback);
};


/**
 * @param {!proto.fullDuplexTest.FullDuplexRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.fullDuplexTest.FullDuplexResponse>}
 *     A native promise that resolves to the response
 */
proto.fullDuplexTest.TestDuplexServicePromiseClient.prototype.send =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/fullDuplexTest.TestDuplexService/send',
      request,
      metadata || {},
      methodInfo_TestDuplexService_send);
};


module.exports = proto.fullDuplexTest;

