var myUtilities = (function(mu) {
  /**
   * Función que remplaza los acentos y caracteres latinos por las respectivas vocales.
   * @param {String} text Valor a partir del cual se reemplazará los acentos y caracteres latinos.
   * @return {String | undefined} Retorna el texto con los caracteres sustituidos; o "undefined" si el parámetro no corresponde a un String.
   */
   mu.replaceLatinSymbols = function(text) {
    // Se valida si el valor definido por parámetro es válido
    if (validateParamType_(text, "string", true)) {
      // Se define un objeto cuyos índices corresponde a las vocales a reemplazar; y sus respectivos valores son la lista de caracteres que se deben reemplazar
      var vowelsObject = {"A": /[ÃÀÁÄÂ]/g,"E": /[ÈÉËÊ]/g,"I": /[ÌÍÏÎ]/g,"O": /[ÒÓÖÔ]/g,"U": /[ÙÚÜÛ]/g,"a": /[ãàáäâ]/g,"e": /[èéëê]/g,"i": /[ìíïî]/g,"o": /[òóöô]/g,"u": /[ùúüû]/g};

      // Se recorre las propiedades del objeto "vowelsObject"
      for (var vowel in vowelsObject) {
        // Se valida si el índice "vowel" se encuentra definido en el objeto "vowelsObject"
        if (vowelsObject.hasOwnProperty(vowel)) {
          // Para cada una de las opciones se reemplaza los caracteres definidos en "vowelsObject[vowel]" por la respectiva vocal establecida
          text = text.replace(vowelsObject[vowel], vowel);
        }
      }

      // Se retorna el texto con los caracteres especiales reemplazados
      return text;
    }
  };

  /**
   * Función que obtiene un texto formateado para comparación o búsqueda.
   * @param {String} textValue Valor que se desea formatear.
   * @param {String} [transformFunctionName = toLowerCase] Valor que establece si se convierte el texto a mayúscula (toUpperCase) o a minúscula (toLowerCase).
   * @param {Boolean} [replaceVowels = true] Valor de verdad que define si se reemplaza valores acentuados por las equivalentes vocales.
   * @return {String | undefined} Retorna el texto formateado; o "undefined" si el parámetro no corresponde a un String.
   */
  mu.getFormattedText = function(textValue, transformFunctionName, replaceVowels) {
    // Se actualiza el valor de los parámetros "transformFunctionName" y "replaceVowels" en caso de que en la función no se haya definido
    transformFunctionName = setUndefinedParam_(transformFunctionName, "toLowerCase");
    replaceVowels = setUndefinedParam_(replaceVowels, true);

    if (validateParamType_(textValue, "string", false)) {
      // Se elimina espacios al inicio y final del valor de "textValue"
      textValue = textValue.trim();

      // Se valida si se debe reemplazar los caracteres semejantes a las vocales
      if (replaceVowels) {
        // Se invoca la función que reemplaza acentos por las equivalentes vocales
        textValue = mu.replaceLatinSymbols(textValue);
      }

      // Se valida si el valor de "transformFunctionName" corresponde a alguna de las opciones
      if (["toLowerCase", "toUpperCase"].indexOf(transformFunctionName) != -1) {
        // Se ejecuta la función que convierte a mayúscula o minúscula (segun el valor de "transformFunctionName")
        textValue = textValue[transformFunctionName]();
      }

      // Se retorna el valor de la variable
      return textValue;
    }
  };

  /**
   * Función que convierte un texto a formato de Título (primer caracter de cada palabra en mayúscula y el restante en minúscula).
   * @param {String} text Valor a partir del cual se aplicará el formato de Título.
   * @return {String} Retorna el texto en formato de Título; o `undefined` si el parámetro no corresponde a un String.
   */
  mu.capitalizeText = function(text) {
    // Se valida si el valor definido por parámetro corresponde a un String y no es vacío
    if (validateParamType_(text, "string", true)) {
      // Se elimina los espacios del principio y final del texto
      text = text.trim().toLowerCase();

      // Se valida si existe un valor en la variable
      if (text) {
        // Se obtiene cada una de las palabras del texto
        var words = text.split(" ");

        // Se recorre cada una de las palabras del texto; y se convierte a mayúscula la primer letra de cada palabra
        return words.map(function(word) {
          // Se concatena el primer caracter en mayúscula y el texto restante en minúscula
          return word.slice(0, 1).toUpperCase() + word.slice(1);
        }).join(" ");
      }
    }
  };

  /**
   * Función que inserta los parámetros definidos en un objeto como parámetros GET en una URL.
   * @param {String} URL Texto de la URL.
   * @param {Object} paramsObject Objeto con los parámetros a establecer en la URL usando método GET.
   * @return {String} Retorna la URL con los parámetros.
   */
  mu.insertGetParams = function(URL, paramsObject) {
    // Se valida si el valor del parámetro "URL" corresponde a un String y no es vacío
    if (validateParamType_(URL, "string", false)) {
      // Se valida si se definió un valor en el parámetro "paramsObject"
      if (paramsObject) {
        // Se valida si el parámetro "paramsObject" es un objeto
        if (paramsObject.constructor == Object) {
          // Se declara una variable con el texto de los parámetros GET
          var paramsString = "";
          // Se recorre los atributos del objeto "paramsObject"
          for (var i in paramsObject) {
            // Se valida si la propiedad "i" corresponde a un atributo del objeto "paramsObject"
            if (paramsObject.hasOwnProperty(i)) {
              // Se concatena el signo "?" si es el primer parámetro a insertar en la URL; ó "&" en caso contrario
              paramsString += (paramsString == "" ? "?" : "&");

              // Se concatena cada uno de los parámetros GET definidos en el objeto "paramsObject"
              paramsString += i + "=" + encodeURIComponent(paramsObject[i]);
            }
          }
          // Se concatena a la URL el texto de los parámetros GET
          URL += paramsString;
        }
      }

      // Se retorna el valor de la URL
      return URL;
    }
  };

  /**
   * Función que obtiene la URL genérica con base al Id del archivo de Google Drive.
   * @param {String} fileId Id del archivo de Google Drive.
   * @param {String} type Propiedad que indica la opción de la URL a generar.
   * @return {String} Retorna la URL respectiva.
   */
  mu.getDriveUrl = function(fileId, type) {
    // Se valida si el parámetro corresponde a un valor de tipo String
    if (validateParamType_(fileId, "string", true)) {
      // Se elimina los espacios del principio y fin del texto
      fileId = fileId.trim();

      // Se valida si la variable tiene un valor
      if (fileId) {
        // Se define en un objeto las opciones de URL
        var options = {
          // URL para descargar un archivo de Google Apps Script (en formato JSON)
          downloadScriptFile: "https://script.google.com/feeds/download/export?id=FILE_ID&format=json",
          // URL para descargar un Google Docs a archivo Word
          downloadToWord: "https://docs.google.com/feeds/download/documents/export/Export?id=FILE_ID&exportFormat=docx",
          // URL para exportar a archivo Word (incluir token)
          exportToWord: "https://docs.google.com/document/export?format=docx&id=FILE_ID",
          // URL para previsualizar un archivo de Google Drive
          previewFile: "https://drive.google.com/file/d/FILE_ID/preview"
        };

        // Se valida si existe el valor de la URL del tipo definido en el parámetro "type"
        if (options[type]) {
          // Se retorna el valor de la URL
          return options[type].replace("FILE_ID", fileId);
        }
      }
    }
  };

  /**
   * Función que convierte el número de columna de una hoja de cálculo a su correspondiente letra.
   * @param {Number|String} columnNumber Número de la columna.
   * @return {String} Retorna la letra correspondiente a la columna.
   */
  mu.getColumnLetter = function(columnNumber) {
    // Se valida si el valor del parámetro "columnNumber" corresponde a un número
    if (!isNaN(columnNumber)) {
      // Se convierte el valor de "columnNumber" a un dato de tipo Number
      columnNumber = Number(columnNumber);

      // Se valida si el valor de "columnNumber" es mayor a cero
      if (columnNumber > 0) {
        // Se invoca de manera recursiva la función "getColumnLetter" definiendo por parámetro el cociente entre el valor ingresado y el N° total de letras (26).
        // A dicho valor retornado se concatena el valor del caracter equivalente al valor ingresado, de acuerdo al código ASCII
        return mu.getColumnLetter(Math.floor((columnNumber - 1) / 26)) + String.fromCharCode((columnNumber - 1) % 26 + 97).toUpperCase();
      }
    }

    // Se retorna un texto vacío por defecto
    return "";
  };

  /**
   * Función que convierte la letra de columna de una hoja de cálculo a su correspondiente número.
   * @params {String} columnLetter Letra de la columna.
   * @return {Number} Retorna el número correspondiente a la columna.
   */
  mu.getColumnNumber = function(columnLetter) {
    // Se valida si el parámetro corresponde a un valor de tipo String
    if (validateParamType_(columnLetter, "string", true)) {
      // Se elimina espacios al inicio y final del texto; y se convierte a mayúsculas
      columnLetter = columnLetter.trim().toUpperCase();

      // Se valida si el texto contiene solamente caracteres de la A a la Z
      if (columnLetter.match(/^[A-Z]+$/) !== null) {
        // Se retorna el valor devuelto por la función
        return calculateColumnNumber_(columnLetter, 0);
      }
    }

    // Se retorna un texto vacío por defecto
    return "";
  };

  /**
   * Función que combina los datos definidos en un objeto sobre un segundo objeto.
   * @param {Object} obj: Objeto sobre el cual se actualizará las propiedades.
   * @param {Object} src: Objeto a partir del cual se remplaza los valores.
   * @param {Boolean} updateValues: Valor de verdad que establece si se actualizan o no (TRUE o FALSE, respectivamente) los valores definidos en el objeto "src" que existen en el objeto "obj".
   * @param {Boolean} updateIndex: Valor de verdad que establece si se inserta o no (TRUE o FALSE, respectivamente) los índices del objeto "src" en el objeto "obj".
   */
  mu.combineObject = function(obj, src, updateValues, updateIndex) {
    updateValues = typeof updateValues == "undefined" ? true : updateValues;
    updateIndex = typeof updateIndex == "undefined" ? true : updateIndex;

    // Se valida si alguno de los valores de actualización tienen
    if (updateValues || updateIndex) {
      loopObject_(obj, src, updateValues, updateIndex);
    }
    function loopObject_(obj, src, updateValues, updateIndex) {
      // Se recorre las propiedades del objeto "src"
      for (var key in src) {
        // Se valida si la propiedad "key" se encuentra definida en el objeto "src"
        if (src.hasOwnProperty(key)) {
          // Se valida si la propiedad "key" se encuentra definida en el objeto "obj"
          if (obj.hasOwnProperty(key)) {
            // Se valida si se actualiza el valor de la propiedad "key" del objeto "src" en el objeto "obj"
            if (updateValues) {
              // Se actualiza el valor de "src[key]" en "obj[key]"
              setPropertyValue_(obj, src, key, updateValues, updateIndex);
            }
          } else {
            // Se valida si se debe insertar el índice "key" del objeto "src" en el objeto "obj"
            if (updateIndex) {
              // Se actualiza el valor de "src[key]" en "obj[key]"
              setPropertyValue_(obj, src, key, updateValues, updateIndex);
            }
          }
        }
      }
    }
    function setPropertyValue_(obj, src, key, updateValues, updateIndex) {
      var typeOf = typeof src[key];
      if (typeOf == "undefined") { return; }
      if (typeOf == "object") {
        if (src[key] !== null) {
          var type = Object.prototype.toString.call(src[key]);
          switch (type) {
            case "[object Array]":
              obj[key] = [];
              src[key].forEach(function(item, index) {
                setPropertyValue_(obj[key], src[key], index, updateValues, updateIndex);
              });
              return;
            case "[object Object]":
              obj[key] = {};
              loopObject_(obj[key], src[key], updateValues, updateIndex);
              return;
            case "[object Date]":
              obj[key] = new Date(src[key]);
              return;
          }
        }
      }
      obj[key] = src[key];
    }
  };

  /**
   * Función que convierte un número en formato separados por miles.
   * @param {Number|String} number Número que se desea convertir.
   * @return {undefined|String} Retorna el número con el formato aplicado.
   */
  mu.getMilesNumberFormat = function(number) {
    if (validateParamType_(number, "number", false)) {
      number = String(number);
    }

    // Se valida si el parámetro corresponde a un valor de tipo String
    if (validateParamType_(number, "string", true)) {
      // convertimos en texto el vakir ubfgr
      number = number.toString();

      // Se invoca la función que valida si el valor es un número entero positivo o negativo
      var match = number.match(/^(-?)(\d+)$/);
      if (match) {
        // Se retorna el valor del signo junto con el respectivo número separado por miles
        return match[1] + String(match[2]).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      }

      // Se invoca la función que valida si el valor es un numero decimal positivo o negativo
      match = number.match(/^(-?)(\d+\.\d+)$/);
      if (match) {
        var array = match[2].split(".");
        return match[1] + String(array[0]).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "," + String(array[1]);
      }
    }
  };

  /**
   * Función que valida si un texto corresponde a una dirección de correo electrónico.
   * @param {String} email Texto del correo electrónico a validar.
   * @return {Boolean} Retorna el valor de verdad que indica si el valor es o no una dirección de correo electrónico (TRUE o FALSE respectivamente).
   */
  mu.validateEmail = function(email) {
    // Se valida si el parámetro corresponde a un valor de tipo String
    if (validateParamType_(email, "string", true)) {
      // Se valida si el valor es una dirección de correo electrónico; y se retorna el valor de verdad de dicha validación
      return email.match(/^[\w\.-]+@[\w\.-]+?(?:\.[a-zA-Z]{2,}){1,}$/i) ? true : false;
    }

    // Se retorna por defecto el valor FALSE
    return false;
  };

  /**
   * Función que convierte un número entero positivo a su valor equivalente en el sistema de numeración romano.
   * Para valores de 4000 en adelante se concatena el signo "|".
   * @param {Number} number Número que se desea convertir.
   * @return {String} Valor del número en romano.
   */
  mu.numberToRoman = function(number) {
    // Se valida si el parámetro corresponde a un valor de tipo Number
    if (validateParamType_(number, "number", false)) {
      // Se valida si el número es mayor a cero
      if (number > 0) {
        // Se valida si el valor ingresado es menor a 4000
        if (number < 4000) {
          // Se define un objeto con los valores de cada uno de los números romanos y su respectivo equivalente en número
          var lookup = {M:1000, CM:900, D:500, CD:400, C:100, XC:90, L:50, XL:40, X:10, IX:9, V:5, IV:4, I:1}, roman = '';
          // Se recorre cada índice del objeto; y se concatena el valor respectivo del número romano
          for (var i in lookup) {
            if (lookup.hasOwnProperty(i)) {
              while (number >= lookup[i]) {
                roman += i;
                number -= lookup[i];
              }
            }
          }
          // Se retorna el valor del número romano
          return roman;
        } else {
          // Se realiza un llamado en forma recursiva
          return mu.numberToRoman(Math.floor(number / 1000)) + "|" + mu.numberToRoman(number % 1000);
        }
      }
      // Se retorna un texto vacío
      return "";
    }
  };

  /**
   * Función que convierte un número romano a su valor equivalente en el sistema de numeración decimal.
   * Para valores de 4000 en adelante se concatena el signo "|".
   * @param {String} romanNumber Número romano que se desea convertir.
   * @return {Number} Valor del número en entero.
   */
  mu.romanToNumber = function(romanNumber) {
    // Se valida si el parámetro corresponde a un valor de tipo String
    if (validateParamType_(romanNumber, "string", true)) {
      // Se eliminan espacios y se convierte el texto a mayúscula
      romanNumber = romanNumber.trim().toUpperCase();
      // Se valida si existe un valor en el parámetro
      if (romanNumber) {
        // Se declara un objeto con los valores de cada uno de los números romanos y su respectivo equivalente en número
        var lookup = {M:1000, CM:900, D:500, CD:400, C:100, XC:90, L:50, XL:40, X:10, IX:9, V:5, IV:4, I:1}, number = 0;
        // Se valida si "romanNumber" tiene un valor definido
        while (romanNumber) {
          // Se obtiene los 2 primeros caracteres del texto
          var tempValue = romanNumber.slice(0, 2);

          // Se valida si existe el número romano en la lista "lookup"
          if (lookup.hasOwnProperty(tempValue)) {
            // Se incrementa el contador
            number += lookup[tempValue];
            // Se elimina el texto extraido inicialmente
            romanNumber = romanNumber.slice(2);
          } else {
            // Se referencia solamente el primer caracter
            tempValue = romanNumber.slice(0, 1);

            // Se valida si existe el número romano en la lista "lookup"
            if (lookup.hasOwnProperty(tempValue)) {
              // Se incrementa el contador
              number += lookup[tempValue];
              // Se elimina el texto extraido inicialmente
              romanNumber = romanNumber.slice(1);
            } else {
              // Se valida si el caracter corresponde al signo pipe "|"
              if (tempValue == "|") {
                // Se multiplica el valor establecido por 1000
                number *= 1000;
                // Se elimina el texto extraido inicialmente
                romanNumber = romanNumber.slice(1);
              } else {
                throw "La conversion no pudo completarse debido al caracter \"" + tempValue + "\"";
              }
            }
          }
        }
        // Se retorna el valor del número
        return number;
      }
    }
  };

  /**
   * Función que se invoca para configurar un campo de texto de tal manera que solamente permita digitar caracteres numéricos.
   * @param {jQuery Element} $field Referencia al campo sobre el cual se desea realizar la configuración.
   */
  mu.setNumberOnly = function($field) {
    $field.keypress(function(event) {
      var key = window.event ? event.keyCode : event.which;
      if (event.keyCode === 8 || event.keyCode === 46) {
        return true;
      } else if (key < 48 || key > 57) {
        return false;
      } else {
        return true;
      }
    }).bind("paste", function(e) {
      var pastedData = e.originalEvent.clipboardData.getData('text');
      return /^\d+$/g.test(pastedData);
    });
  };

  /**
   * Función que se invoca para configurar un campo de lista desplegable con sus respectivas opciones.
   * @param {jQuery Element} $select Referencia al elemento <SELECT> donde se insertarán las opciones.
   * @param {Array | Object} values Lista de valores a insertar en el elemento `$select`.
   * @param {Object} params Objeto con parámetros adicionales en la ejecución de la función.
   * @param {Boolean} [params.toEmpty == true] Valor de verdad que permite establecer si se vacía o no la lista desplegable (TRUE o FALSE).
   * @param {Boolean} [params.emptyOption == true] Valor de verdad que permite establecer si se inseerta o no una opción vacía (TRUE o FALSE).
   * @param {String} [params.emptyOptionText == "- selecciona -"] Texto de la opción vacía a establecer (si params.emptyOption es TRUE).
   * @param {Function} [params.callbackInsertOption == Function] Función que se ejecuta para insertar cada una de las opciones en la lista desplegable.
   *
   * params.callbackInsertOption
   * Función que se ejecuta en cada iteración del recorrido de los valores definidos en "values".
   * @param {jQuery Element} $select Referencia al elemento <SELECT> donde se insertarán las opciones.
   * @param {String} index Índice de la posición del elemento.
   * @param {*} value Valor definido en cada posición del parámetro "values".
   */
  mu.setSelectValues = function($select, values, params) {
    // Se procede a validar el parámetro "values".
    if (typeof values === "undefined") {
      throw "Por favor defina los valores a insertar en el parámetro 'values' de la función";
    }
    if (values.constructor !== Object && values.constructor !== Array) {
      throw "El parámetro 'values' debe ser un valor de tipo Object o Array";
    }

    // Se procede a validar el parámetro "params".
    if (typeof params === "undefined") {
      params = {};
    }
    if (params.constructor !== Object) {
      throw "El parámetro 'params' debe ser un valor de tipo Object";
    }

    // Se procede a validar cada una de las propiedades del objeto "params"
    mu.combineObject(params, {
      toEmpty: true,
      emptyOption: true,
      emptyOptionText: "- selecciona -",
      callbackInsertOption: function($select, index, value) {
        $select.append($("<option>").attr("value", value).text(value));
      }
    }, false, true);

    // Se procede a validar el tipo de dato de cada una de las propiedades del objeto "params"
    if (params.toEmpty.constructor !== Boolean) {
      throw "El parámetro 'params.toEmpty' debe ser un valor de tipo Boolean (TRUE o FALSE)";
    }
    if (params.emptyOption.constructor !== Boolean) {
      throw "El parámetro 'params.emptyOption' debe ser un valor de tipo Boolean (TRUE o FALSE)";
    }
    if (params.emptyOptionText.constructor !== String) {
      throw "El parámetro 'params.emptyOptionText' debe ser un valor de tipo String";
    }
    if (params.callbackInsertOption.constructor !== Function) {
      throw "El parámetro 'params.callbackInsertOption' debe ser una función";
    }

    // Se valida si se debe eliminar las opciones del Select
    if (params.toEmpty) {
      $select.html("");
    }
    // Se valida si se debe insertar la opción vacía
    if (params.emptyOption) {
      $select.append($("<option>").attr("value", "").text(params.emptyOptionText));
    }

    // Se recorre el listado de elementos definidos en el parámetro "values"; y se ejecuta la función "params.callbackInsertOption" en cada iteración
    for (var i in values) {
      if (values.hasOwnProperty(i)) {
        // Se ejecuta la función que inserta cada una de las opciones
        params.callbackInsertOption($select, i, values[i]);
      }
    }
  };

  /**
   * Función que se invoca para validar los campos de un formulario.
   * @param {Form Element} form Referencia al elemento del formulario.
   * @param {String} fieldName Valor definido en el atributo "name " del campo de formulario.
   * @param {Object} objectForm Referencia al objeto donde se consolida los datos del formulario.
   * @param {String} attrName Nombre de la propiedad donde se define el valor del campo.
   * @param {Object} params Objeto con parámetros adicionales.
   * @param {*} params.defaultValue Valor por defecto a establecer en el campo.
   * @param {Boolean} params.required Valor de verdad que indica si el campo es o no requerido.
   * @param {Function} params.callbackSetValue Función a ejecutar para asignar el valor del campo en el objeto del formulario.
   * @param {Function} params.callbackNotFieldFunction Función a ejecutar si el campo no existe en el formulario.
   */
  mu.validateFormField = function(form, fieldName, objectForm, attrName, params) {
    // Se valida el parámetro "fieldName"
    if (!validateParamType_(fieldName, "string", true)) {
      throw "Favor defina un valor de tipo String en el parámetro 'fieldName'";
    }

    // Se procede a validar el parámetro "values".
    if (typeof objectForm === "undefined") {
      throw "Por favor defina el objeto en el parámetro 'objectForm'";
    }
    if (objectForm.constructor !== Object) {
      throw "El parámetro 'objectForm' debe ser un valor de tipo Object";
    }

    // Se valida el parámetro "attrName"
    if (!validateParamType_(attrName, "string", true)) {
      throw "Favor defina un valor de tipo String en el parámetro 'attrName'";
    }

    // Se procede a validar el parámetro "params".
    if (typeof params === "undefined") {
      params = {};
    }
    if (params.constructor !== Object) {
      throw "El parámetro 'params' debe ser un valor de tipo Object";
    }

    // Se procede a validar cada una de las propiedades del objeto "params"
    mu.combineObject(params, {
      // Valor por defecto
      defaultValue: "",
      // El campo es obligatorio
      required: true,
      // Texto de error en validación del campo
      requiredText: ("Por favor defina un valor en el campo '" + fieldName + "'"),
      // Función a ejecutar que establece el valor
      callbackSetValue: function(objectForm, attrName, fieldValue) {
        // Se establece el valor de "fieldValue" o el valor por defecto en la propiedad "attrName" del objeto "objectForm"
        objectForm[attrName] = fieldValue || this.defaultValue;
      },
      // Función a ejecutar si no existe el campo en el formulario
      callbackNotFieldFunction: function(fieldName) {
        // Se genera una excepción con el siguiente mensaje
        throw "Por favor valide el campo \"" + fieldName + "\"";
      }
    }, false, true);

    // Se procede a validar el tipo de dato de cada una de las propiedades del objeto "params"
    if (params.required.constructor !== Boolean) {
      throw "El parámetro 'params.required' debe ser un valor de tipo Boolean (TRUE o FALSE)";
    }
    if (params.requiredText.constructor !== String) {
      throw "El parámetro 'params.requiredText' debe ser un valor de tipo String";
    }
    if (params.callbackSetValue.constructor !== Function) {
      throw "El parámetro 'params.callbackSetValue' debe ser una función";
    }
    if (params.callbackNotFieldFunction.constructor !== Function) {
      throw "El parámetro 'params.callbackNotFieldFunction' debe ser una función";
    }

    // Se valida si el campo definido en "form[fieldName]" existe
    if (form[fieldName]) {
      // Se obtiene el valor del campo
      var fieldValue = $(form[fieldName]).val();
      if (typeof fieldValue == "string") {
        fieldValue = fieldValue.trim();
      }

      // Se valida si el campo no tiene definido un valor; y éste es requerido
      if (!fieldValue && params.required) {
        // Se genera una excepción con el siguiente mensaje
        throw params.requiredText;
      }

      // Se invoca la función que establece el valor del campo en el objeto
      params.callbackSetValue(objectForm, attrName, fieldValue);
    } else {
      // Se ejecuta la función para el caso que no exista el campo
      params.callbackNotFieldFunction(fieldName);
    }
  };

  return mu;

  /**
   * Función que se invoca para validar si el tipo de dato del parámetro corresponde al valor solicitado.
   * @param {*} value Valor que se desea validar.
   * @param {String} type Valor del tipo de dato del parámetro "value"
   * @param {String} required Valor de verdad que indica si se debe o no validar que exista un valor definido en el parámetro "value"
   */
  function validateParamType_(value, type, required) {
    if (required) {
      return value ? (typeof value == type) : false;
    } else {
      return typeof value == type;
    }
  }

  /**
   * Función que se invoca para establecer un valor predeterminado para un valor undefined.
   * @param {*} value Valor definido por parámetro.
   * @param {*} defaultValue Valor a definir en caso que "value" no tenga un valor definido.
   * @return {*} Retorna el valor a establecer en la variable
   */
  function setUndefinedParam_(value, defaultValue) {
    return typeof value == "undefined" ? defaultValue : value;
  }

  /**
   * Función que se invoca en la función "getColumnNumber()" para obtener el N° correspondiente a la columna de la letra.
   * @param {String} columnLetter Texto definido en la función "getColumnNumber";
   * @param {Number} position Valor que indica el incremento del exponente
   * @return {Number} Retorna el valor numérico correspondiente al valor definido en "columnLetter"
   */
  function calculateColumnNumber_(columnLetter, position) {
    // Se valida si existe un texto
    if (columnLetter) {
      // Se obtiene el último caracter del texto
      var lastCharacter = columnLetter.slice(-1);

      /*
       * Se retorna el resultado de la operación A*B + C, donde:
       * - (A): El n° correspondiente al último caracter
       * - (B): La operación equivalente a 26^position
       * - (C): Valor retornado de la función calculateColumnNumber_() con los caracteres restantes
       */
      return (lastCharacter.charCodeAt() - 64) * (position == 0 ? 1 : position * 26) + calculateColumnNumber_(columnLetter.slice(0, -1), position + 1);
    }

    // Se retorna un valor cero
    return 0;
  }
})(myUtilities || {});