(function (React) {
  'use strict';

  function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

  var React__default = /*#__PURE__*/_interopDefault(React);

  /*! js-cookie v3.0.5 | MIT */
  /* eslint-disable no-var */
  function assign(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        target[key] = source[key];
      }
    }
    return target;
  }
  /* eslint-enable no-var */

  /* eslint-disable no-var */
  var defaultConverter = {
    read: function (value) {
      if (value[0] === '"') {
        value = value.slice(1, -1);
      }
      return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
    },
    write: function (value) {
      return encodeURIComponent(value).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g, decodeURIComponent);
    }
  };
  /* eslint-enable no-var */

  /* eslint-disable no-var */

  function init(converter, defaultAttributes) {
    function set(name, value, attributes) {
      if (typeof document === 'undefined') {
        return;
      }
      attributes = assign({}, defaultAttributes, attributes);
      if (typeof attributes.expires === 'number') {
        attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
      }
      if (attributes.expires) {
        attributes.expires = attributes.expires.toUTCString();
      }
      name = encodeURIComponent(name).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
      var stringifiedAttributes = '';
      for (var attributeName in attributes) {
        if (!attributes[attributeName]) {
          continue;
        }
        stringifiedAttributes += '; ' + attributeName;
        if (attributes[attributeName] === true) {
          continue;
        }

        // Considers RFC 6265 section 5.2:
        // ...
        // 3.  If the remaining unparsed-attributes contains a %x3B (";")
        //     character:
        // Consume the characters of the unparsed-attributes up to,
        // not including, the first %x3B (";") character.
        // ...
        stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
      }
      return document.cookie = name + '=' + converter.write(value, name) + stringifiedAttributes;
    }
    function get(name) {
      if (typeof document === 'undefined' || arguments.length && !name) {
        return;
      }

      // To prevent the for loop in the first place assign an empty array
      // in case there are no cookies at all.
      var cookies = document.cookie ? document.cookie.split('; ') : [];
      var jar = {};
      for (var i = 0; i < cookies.length; i++) {
        var parts = cookies[i].split('=');
        var value = parts.slice(1).join('=');
        try {
          var found = decodeURIComponent(parts[0]);
          jar[found] = converter.read(value, found);
          if (name === found) {
            break;
          }
        } catch (e) {}
      }
      return name ? jar[name] : jar;
    }
    return Object.create({
      set,
      get,
      remove: function (name, attributes) {
        set(name, '', assign({}, attributes, {
          expires: -1
        }));
      },
      withAttributes: function (attributes) {
        return init(this.converter, assign({}, this.attributes, attributes));
      },
      withConverter: function (converter) {
        return init(assign({}, this.converter, converter), this.attributes);
      }
    }, {
      attributes: {
        value: Object.freeze(defaultAttributes)
      },
      converter: {
        value: Object.freeze(converter)
      }
    });
  }
  var api = init(defaultConverter, {
    path: '/'
  });

  const dashboard = () => {
    const logout = async () => {
      try {
        api.remove('token');
      } catch (error) {
        console.log(error);
      }
    };
    return /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '40px'
      }
    }, /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        marginBottom: '20px'
      }
    }, /*#__PURE__*/React__default.default.createElement("h1", {
      style: {
        textAlign: 'center',
        fontSize: '2em',
        padding: '10px',
        textWrap: 'wrap',
        color: 'black',
        fontWeight: 'bold'
      }
    }, "Bienvenido al panel crud de administrador"), /*#__PURE__*/React__default.default.createElement("p", {
      style: {
        color: 'black',
        padding: '10px'
      }
    }, "Aqu\xED podr\xE1s gestionar los registros de la base de datos haciendo click en \"prisma\" en la barra lateral podras observar todos las tablas de la base de datos, haciendo click en un modelo podras observar los registros actuales")), /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React__default.default.createElement("a", {
      href: "http://localhost:5173/admin/home",
      style: {
        margin: '10px',
        textDecoration: 'none',
        color: 'black',
        backgroundColor: 'white',
        padding: '10px',
        // border: '1px solid black',
        borderRadius: '5px',
        height: '100px',
        width: '400px',
        boxShadow: '0px 0px 10px 0px lightgrey'
      }
    }, /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        padding: '10px'
      }
    }, /*#__PURE__*/React__default.default.createElement("h5", {
      style: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        textJustify: 'center'
      }
    }, "Volver al Home "), /*#__PURE__*/React__default.default.createElement("p", null, "Click aqu\xED para volver al panel anterior para ver todas las funciones del administrador"))), /*#__PURE__*/React__default.default.createElement("a", {
      onClick: logout,
      // href: "http://localhost:5173/login" //dev
      href:'https://classic-vision.alhanisespinal.tech/login' //deploy
      ,
      style: {
        margin: '10px',
        textDecoration: 'none',
        color: 'black',
        backgroundColor: 'white',
        padding: '10px',
        // border: '1px solid black',
        borderRadius: '5px',
        height: '100px',
        width: '400px',
        boxShadow: '0px 0px 10px 0px lightgrey'
      }
    }, /*#__PURE__*/React__default.default.createElement("div", {
      style: {
        padding: '10px'
      }
    }, /*#__PURE__*/React__default.default.createElement("h5", {
      style: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        textJustify: 'center'
      }
    }, "Salir "), /*#__PURE__*/React__default.default.createElement("p", null, "Click aqu\xED para cerrar tu sesi\xF3n")))));
  };

  AdminJS.UserComponents = {};
  AdminJS.UserComponents.Dashboard = dashboard;

})(React);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvanMtY29va2llL2Rpc3QvanMuY29va2llLm1qcyIsIi4uL3NyYy9kYXNoYm9hcmQuanN4IiwiZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohIGpzLWNvb2tpZSB2My4wLjUgfCBNSVQgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXZhciAqL1xuZnVuY3Rpb24gYXNzaWduICh0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgfVxuICB9XG4gIHJldHVybiB0YXJnZXRcbn1cbi8qIGVzbGludC1lbmFibGUgbm8tdmFyICovXG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXZhciAqL1xudmFyIGRlZmF1bHRDb252ZXJ0ZXIgPSB7XG4gIHJlYWQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZVswXSA9PT0gJ1wiJykge1xuICAgICAgdmFsdWUgPSB2YWx1ZS5zbGljZSgxLCAtMSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKC8oJVtcXGRBLUZdezJ9KSsvZ2ksIGRlY29kZVVSSUNvbXBvbmVudClcbiAgfSxcbiAgd3JpdGU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpLnJlcGxhY2UoXG4gICAgICAvJSgyWzM0NkJGXXwzW0FDLUZdfDQwfDVbQkRFXXw2MHw3W0JDRF0pL2csXG4gICAgICBkZWNvZGVVUklDb21wb25lbnRcbiAgICApXG4gIH1cbn07XG4vKiBlc2xpbnQtZW5hYmxlIG5vLXZhciAqL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby12YXIgKi9cblxuZnVuY3Rpb24gaW5pdCAoY29udmVydGVyLCBkZWZhdWx0QXR0cmlidXRlcykge1xuICBmdW5jdGlvbiBzZXQgKG5hbWUsIHZhbHVlLCBhdHRyaWJ1dGVzKSB7XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGF0dHJpYnV0ZXMgPSBhc3NpZ24oe30sIGRlZmF1bHRBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzKTtcblxuICAgIGlmICh0eXBlb2YgYXR0cmlidXRlcy5leHBpcmVzID09PSAnbnVtYmVyJykge1xuICAgICAgYXR0cmlidXRlcy5leHBpcmVzID0gbmV3IERhdGUoRGF0ZS5ub3coKSArIGF0dHJpYnV0ZXMuZXhwaXJlcyAqIDg2NGU1KTtcbiAgICB9XG4gICAgaWYgKGF0dHJpYnV0ZXMuZXhwaXJlcykge1xuICAgICAgYXR0cmlidXRlcy5leHBpcmVzID0gYXR0cmlidXRlcy5leHBpcmVzLnRvVVRDU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgbmFtZSA9IGVuY29kZVVSSUNvbXBvbmVudChuYW1lKVxuICAgICAgLnJlcGxhY2UoLyUoMlszNDZCXXw1RXw2MHw3QykvZywgZGVjb2RlVVJJQ29tcG9uZW50KVxuICAgICAgLnJlcGxhY2UoL1soKV0vZywgZXNjYXBlKTtcblxuICAgIHZhciBzdHJpbmdpZmllZEF0dHJpYnV0ZXMgPSAnJztcbiAgICBmb3IgKHZhciBhdHRyaWJ1dGVOYW1lIGluIGF0dHJpYnV0ZXMpIHtcbiAgICAgIGlmICghYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXSkge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICBzdHJpbmdpZmllZEF0dHJpYnV0ZXMgKz0gJzsgJyArIGF0dHJpYnV0ZU5hbWU7XG5cbiAgICAgIGlmIChhdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIC8vIENvbnNpZGVycyBSRkMgNjI2NSBzZWN0aW9uIDUuMjpcbiAgICAgIC8vIC4uLlxuICAgICAgLy8gMy4gIElmIHRoZSByZW1haW5pbmcgdW5wYXJzZWQtYXR0cmlidXRlcyBjb250YWlucyBhICV4M0IgKFwiO1wiKVxuICAgICAgLy8gICAgIGNoYXJhY3RlcjpcbiAgICAgIC8vIENvbnN1bWUgdGhlIGNoYXJhY3RlcnMgb2YgdGhlIHVucGFyc2VkLWF0dHJpYnV0ZXMgdXAgdG8sXG4gICAgICAvLyBub3QgaW5jbHVkaW5nLCB0aGUgZmlyc3QgJXgzQiAoXCI7XCIpIGNoYXJhY3Rlci5cbiAgICAgIC8vIC4uLlxuICAgICAgc3RyaW5naWZpZWRBdHRyaWJ1dGVzICs9ICc9JyArIGF0dHJpYnV0ZXNbYXR0cmlidXRlTmFtZV0uc3BsaXQoJzsnKVswXTtcbiAgICB9XG5cbiAgICByZXR1cm4gKGRvY3VtZW50LmNvb2tpZSA9XG4gICAgICBuYW1lICsgJz0nICsgY29udmVydGVyLndyaXRlKHZhbHVlLCBuYW1lKSArIHN0cmluZ2lmaWVkQXR0cmlidXRlcylcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldCAobmFtZSkge1xuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnIHx8IChhcmd1bWVudHMubGVuZ3RoICYmICFuYW1lKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gVG8gcHJldmVudCB0aGUgZm9yIGxvb3AgaW4gdGhlIGZpcnN0IHBsYWNlIGFzc2lnbiBhbiBlbXB0eSBhcnJheVxuICAgIC8vIGluIGNhc2UgdGhlcmUgYXJlIG5vIGNvb2tpZXMgYXQgYWxsLlxuICAgIHZhciBjb29raWVzID0gZG9jdW1lbnQuY29va2llID8gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7ICcpIDogW107XG4gICAgdmFyIGphciA9IHt9O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29va2llcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHBhcnRzID0gY29va2llc1tpXS5zcGxpdCgnPScpO1xuICAgICAgdmFyIHZhbHVlID0gcGFydHMuc2xpY2UoMSkuam9pbignPScpO1xuXG4gICAgICB0cnkge1xuICAgICAgICB2YXIgZm91bmQgPSBkZWNvZGVVUklDb21wb25lbnQocGFydHNbMF0pO1xuICAgICAgICBqYXJbZm91bmRdID0gY29udmVydGVyLnJlYWQodmFsdWUsIGZvdW5kKTtcblxuICAgICAgICBpZiAobmFtZSA9PT0gZm91bmQpIHtcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7fVxuICAgIH1cblxuICAgIHJldHVybiBuYW1lID8gamFyW25hbWVdIDogamFyXG4gIH1cblxuICByZXR1cm4gT2JqZWN0LmNyZWF0ZShcbiAgICB7XG4gICAgICBzZXQsXG4gICAgICBnZXQsXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIChuYW1lLCBhdHRyaWJ1dGVzKSB7XG4gICAgICAgIHNldChcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgICcnLFxuICAgICAgICAgIGFzc2lnbih7fSwgYXR0cmlidXRlcywge1xuICAgICAgICAgICAgZXhwaXJlczogLTFcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfSxcbiAgICAgIHdpdGhBdHRyaWJ1dGVzOiBmdW5jdGlvbiAoYXR0cmlidXRlcykge1xuICAgICAgICByZXR1cm4gaW5pdCh0aGlzLmNvbnZlcnRlciwgYXNzaWduKHt9LCB0aGlzLmF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMpKVxuICAgICAgfSxcbiAgICAgIHdpdGhDb252ZXJ0ZXI6IGZ1bmN0aW9uIChjb252ZXJ0ZXIpIHtcbiAgICAgICAgcmV0dXJuIGluaXQoYXNzaWduKHt9LCB0aGlzLmNvbnZlcnRlciwgY29udmVydGVyKSwgdGhpcy5hdHRyaWJ1dGVzKVxuICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgYXR0cmlidXRlczogeyB2YWx1ZTogT2JqZWN0LmZyZWV6ZShkZWZhdWx0QXR0cmlidXRlcykgfSxcbiAgICAgIGNvbnZlcnRlcjogeyB2YWx1ZTogT2JqZWN0LmZyZWV6ZShjb252ZXJ0ZXIpIH1cbiAgICB9XG4gIClcbn1cblxudmFyIGFwaSA9IGluaXQoZGVmYXVsdENvbnZlcnRlciwgeyBwYXRoOiAnLycgfSk7XG4vKiBlc2xpbnQtZW5hYmxlIG5vLXZhciAqL1xuXG5leHBvcnQgeyBhcGkgYXMgZGVmYXVsdCB9O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgQ29va2llcyBmcm9tICdqcy1jb29raWUnXHJcblxyXG5jb25zdCBkYXNoYm9hcmQgPSAoKSA9PiB7XHJcblxyXG4gIGNvbnN0IGxvZ291dCA9IGFzeW5jICgpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIENvb2tpZXMucmVtb3ZlKCd0b2tlbicpXHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBzdHlsZT17e1xyXG4gICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxyXG4gICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuICAgICAgcGFkZGluZzogJzQwcHgnLFxyXG4gICAgfX0+XHJcbiAgICAgIDxkaXYgc3R5bGU9e3tcclxuICAgICAgICBtYXJnaW5Cb3R0b206ICcyMHB4JyxcclxuICAgICAgfX0+XHJcbiAgICAgICAgPGgxIHN0eWxlPXt7XHJcbiAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgICAgZm9udFNpemU6ICcyZW0nLFxyXG4gICAgICAgICAgcGFkZGluZzogJzEwcHgnLFxyXG4gICAgICAgICAgdGV4dFdyYXA6ICd3cmFwJyxcclxuICAgICAgICAgIGNvbG9yOiAnYmxhY2snLFxyXG4gICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxyXG4gICAgICAgIH19PkJpZW52ZW5pZG8gYWwgcGFuZWwgY3J1ZCBkZSBhZG1pbmlzdHJhZG9yPC9oMT5cclxuICAgICAgICA8cCBzdHlsZT17e1xyXG4gICAgICAgICAgY29sb3I6ICdibGFjaycsXHJcbiAgICAgICAgICBwYWRkaW5nOiAnMTBweCcsXHJcbiAgICAgICAgfX0+QXF1w60gcG9kcsOhcyBnZXN0aW9uYXIgbG9zIHJlZ2lzdHJvcyBkZSBsYSBiYXNlIGRlIGRhdG9zIGhhY2llbmRvIGNsaWNrIGVuIFwicHJpc21hXCIgZW4gbGEgYmFycmEgbGF0ZXJhbCBwb2RyYXMgb2JzZXJ2YXIgdG9kb3MgbGFzIHRhYmxhcyBkZSBsYSBiYXNlIGRlIGRhdG9zLCBoYWNpZW5kbyBjbGljayBlbiB1biBtb2RlbG8gcG9kcmFzIG9ic2VydmFyIGxvcyByZWdpc3Ryb3MgYWN0dWFsZXM8L3A+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IHN0eWxlPXt7XHJcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgIGZsZXhXcmFwOiAnd3JhcCcsXHJcbiAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1hcm91bmQnLFxyXG4gICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG4gICAgICB9fT5cclxuICAgICAgICA8YSBocmVmPSdodHRwOi8vbG9jYWxob3N0OjUxNzMvYWRtaW4vaG9tZSdcclxuICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgIG1hcmdpbjogJzEwcHgnLFxyXG4gICAgICAgICAgICB0ZXh0RGVjb3JhdGlvbjogJ25vbmUnLFxyXG4gICAgICAgICAgICBjb2xvcjogJ2JsYWNrJyxcclxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnd2hpdGUnLFxyXG4gICAgICAgICAgICBwYWRkaW5nOiAnMTBweCcsXHJcbiAgICAgICAgICAgIC8vIGJvcmRlcjogJzFweCBzb2xpZCBibGFjaycsXHJcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzVweCcsXHJcbiAgICAgICAgICAgIGhlaWdodDogJzEwMHB4JyxcclxuICAgICAgICAgICAgd2lkdGg6ICc0MDBweCcsXHJcbiAgICAgICAgICAgIGJveFNoYWRvdzogJzBweCAwcHggMTBweCAwcHggbGlnaHRncmV5JyxcclxuICAgICAgICAgIH19XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17e1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAnMTBweCcsXHJcblxyXG4gICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgIDxoNSBzdHlsZT17e1xyXG4gICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snLFxyXG4gICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcclxuICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAgIHRleHRKdXN0aWZ5OiAnY2VudGVyJyxcclxuICAgICAgICAgICAgfX0+Vm9sdmVyIGFsIEhvbWUgPC9oNT5cclxuICAgICAgICAgICAgPHA+Q2xpY2sgYXF1w60gcGFyYSB2b2x2ZXIgYWwgcGFuZWwgYW50ZXJpb3IgcGFyYSB2ZXIgdG9kYXMgbGFzIGZ1bmNpb25lcyBkZWwgYWRtaW5pc3RyYWRvcjwvcD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvYT5cclxuICAgICAgICA8YSBvbkNsaWNrPXtsb2dvdXR9XHJcbiAgICAgICAgICBocmVmPSdodHRwOi8vbG9jYWxob3N0OjUxNzMvbG9naW4nIC8vZGV2XHJcbiAgICAgICAgICAvLyBocmVmPSdodHRwczovL2NsYXNzaWMtdmlzaW9uLmFsaGFuaXNlc3BpbmFsLnRlY2gvbG9naW4nIC8vZGVwbG95XHJcbiAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICBtYXJnaW46ICcxMHB4JyxcclxuICAgICAgICAgICAgdGV4dERlY29yYXRpb246ICdub25lJyxcclxuICAgICAgICAgICAgY29sb3I6ICdibGFjaycsXHJcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3doaXRlJyxcclxuICAgICAgICAgICAgcGFkZGluZzogJzEwcHgnLFxyXG4gICAgICAgICAgICAvLyBib3JkZXI6ICcxcHggc29saWQgYmxhY2snLFxyXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc1cHgnLFxyXG4gICAgICAgICAgICBoZWlnaHQ6ICcxMDBweCcsXHJcbiAgICAgICAgICAgIHdpZHRoOiAnNDAwcHgnLFxyXG4gICAgICAgICAgICBib3hTaGFkb3c6ICcwcHggMHB4IDEwcHggMHB4IGxpZ2h0Z3JleScsXHJcbiAgICAgICAgICB9fVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3tcclxuICAgICAgICAgICAgcGFkZGluZzogJzEwcHgnLFxyXG5cclxuICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICA8aDUgc3R5bGU9e3tcclxuICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJyxcclxuICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXHJcbiAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgICB0ZXh0SnVzdGlmeTogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgIH19PlNhbGlyIDwvaDU+XHJcbiAgICAgICAgICAgIDxwPkNsaWNrIGFxdcOtIHBhcmEgY2VycmFyIHR1IHNlc2nDs248L3A+XHJcblxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9hPlxyXG5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRhc2hib2FyZFxyXG4iLCJBZG1pbkpTLlVzZXJDb21wb25lbnRzID0ge31cbmltcG9ydCBEYXNoYm9hcmQgZnJvbSAnLi4vc3JjL2Rhc2hib2FyZCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuRGFzaGJvYXJkID0gRGFzaGJvYXJkIl0sIm5hbWVzIjpbImFzc2lnbiIsInRhcmdldCIsImkiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJzb3VyY2UiLCJrZXkiLCJkZWZhdWx0Q29udmVydGVyIiwicmVhZCIsInZhbHVlIiwic2xpY2UiLCJyZXBsYWNlIiwiZGVjb2RlVVJJQ29tcG9uZW50Iiwid3JpdGUiLCJlbmNvZGVVUklDb21wb25lbnQiLCJpbml0IiwiY29udmVydGVyIiwiZGVmYXVsdEF0dHJpYnV0ZXMiLCJzZXQiLCJuYW1lIiwiYXR0cmlidXRlcyIsImRvY3VtZW50IiwiZXhwaXJlcyIsIkRhdGUiLCJub3ciLCJ0b1VUQ1N0cmluZyIsImVzY2FwZSIsInN0cmluZ2lmaWVkQXR0cmlidXRlcyIsImF0dHJpYnV0ZU5hbWUiLCJzcGxpdCIsImNvb2tpZSIsImdldCIsImNvb2tpZXMiLCJqYXIiLCJwYXJ0cyIsImpvaW4iLCJmb3VuZCIsImUiLCJPYmplY3QiLCJjcmVhdGUiLCJyZW1vdmUiLCJ3aXRoQXR0cmlidXRlcyIsIndpdGhDb252ZXJ0ZXIiLCJmcmVlemUiLCJhcGkiLCJwYXRoIiwiZGFzaGJvYXJkIiwibG9nb3V0IiwiQ29va2llcyIsImVycm9yIiwiY29uc29sZSIsImxvZyIsIlJlYWN0IiwiY3JlYXRlRWxlbWVudCIsInN0eWxlIiwiZGlzcGxheSIsImZsZXhEaXJlY3Rpb24iLCJhbGlnbkl0ZW1zIiwicGFkZGluZyIsIm1hcmdpbkJvdHRvbSIsInRleHRBbGlnbiIsImZvbnRTaXplIiwidGV4dFdyYXAiLCJjb2xvciIsImZvbnRXZWlnaHQiLCJmbGV4V3JhcCIsImp1c3RpZnlDb250ZW50IiwiaHJlZiIsIm1hcmdpbiIsInRleHREZWNvcmF0aW9uIiwiYmFja2dyb3VuZENvbG9yIiwiYm9yZGVyUmFkaXVzIiwiaGVpZ2h0Iiwid2lkdGgiLCJib3hTaGFkb3ciLCJ0ZXh0SnVzdGlmeSIsIm9uQ2xpY2siLCJBZG1pbkpTIiwiVXNlckNvbXBvbmVudHMiLCJEYXNoYm9hcmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFBQTtFQUNBO0VBQ0EsU0FBU0EsTUFBTUEsQ0FBRUMsTUFBTSxFQUFFO0VBQ3ZCLEVBQUEsS0FBSyxJQUFJQyxDQUFDLEdB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QUFBQSxTQUFTLEVBQUUsUUFBUTtFQUNuQmUsTUFBQUEsV0FBVyxFQUFFLFFBQUE7RUFDZixLQUFBO0VBQUUsR0FBQSxFQUFDLGlCQUFtQixDQUFDLGVBQ3ZCdkIsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUcsNEZBQTBGLENBQzFGLENBQ0osQ0FBQyxlQUNKRCxzQkFBQSxDQUFBQyxhQUFBLENBQUEsR0FBQSxFQUFBO0VBQUd1QixJQUFBQSxPQUFPLEVBQUU3QixNQUFPO01BQ2pCb0IsSUFBSSxFQUFDLDZCQUE2QjtFQUNsQztFQUFBO0VBQ0FiLElBQUFBLEtBQUssRUFBRTtFQUNMYyxNQUFBQSxNQUFNLEVBQUUsTUFBTTtFQUNkQyxNQUFBQSxjQUFjLEVBQUUsTUFBTTtFQUN0Qk4sTUFBQUEsS0FBSyxFQUFFLE9BQU87RUFDZE8sTUFBQUEsZUFBZSxFQUFFLE9BQU87RUFDeEJaLE1BQUFBLE9BQU8sRUFBRSxNQUFNO0VBQ2Y7RUFDQWEsTUFBQUEsWUFBWSxFQUFFLEtBQUs7RUFDbkJDLE1BQUFBLE1BQU0sRUFBRSxPQUFPO0VBQ2ZDLE1BQUFBLEtBQUssRUFBRSxPQUFPO0VBQ2RDLE1BQUFBLFNBQVMsRUFBRSw0QkFBQTtFQUNiLEtBQUE7S0FFQXRCLGVBQUFBLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7RUFBS0MsSUFBQUEsS0FBSyxFQUFFO0VBQ1ZJLE1BQUFBLE9BQU8sRUFBRSxNQUFBO0VBRVgsS0FBQTtLQUNFTixlQUFBQSxzQkFBQSxDQUFBQyxhQUFBLENBQUEsSUFBQSxFQUFBO0VBQUlDLElBQUFBLEtBQUssRUFBRTtFQUNUUyxNQUFBQSxLQUFLLEVBQUUsT0FBTztFQUNkQyxNQUFBQSxVQUFVLEVBQUUsTUFBTTtFQUNsQkosTUFBQUEsU0FBUyxFQUFFLFFBQVE7RUFDbkJlLE1BQUFBLFdBQVcsRUFBRSxRQUFBO0VBQ2YsS0FBQTtFQUFFLEdBQUEsRUFBQyxRQUFVLENBQUMsZUFDZHZCLHNCQUFBLENBQUFDLGFBQUEsQ0FBRyxHQUFBLEVBQUEsSUFBQSxFQUFBLHdDQUFtQyxDQUVuQyxDQUNKLENBRUEsQ0FDRixDQUFDLENBQUE7RUFFVixDQUFDOztFQ3hHRHdCLE9BQU8sQ0FBQ0MsY0FBYyxHQUFHLEVBQUUsQ0FBQTtFQUUzQkQsT0FBTyxDQUFDQyxjQUFjLENBQUNDLFNBQVMsR0FBR0EsU0FBUzs7Ozs7OyIsInhfZ29vZ2xlX2lnbm9yZUxpc3QiOlswXX0=
