# MyUtilities
Conjunto de funcionalidades comunmente empleadas en el desarrollo de aplicaciones en Google Apps Script

# Instalación
Primero se debe crear un proyecto en [Google Apps Script](https://script.google.com/home), ó abrir un proyecto previamente creado. Posteriormente se debe acceder a la opción <b>Recursos > Bibliotecas</b>, y en el campo <b>Add a library</b> se ingresa el id de la librería `MyoZFi-FZHfWbzEpy3NshgAKPMwQAznpp` y se selecciona la versión mas reciente.

![InstallLibrary](InstallLibrary.png)

Adicionalmente, se cuenta 

# Funciones de uso cómun
A continuación, se encuentra el listado de cada una de las funciones que conforman la librería.

| Función  | Descripción |
| - | - |
| [`combineObject()`](#combineObject) | Establece las propiedades de una variable de tipo Object sobre otra variable del mismo tipo. |
| [`getCapitalizeText()`](#getCapitalizeText) | Convierte un texto a notación Camel Case (primer caracter de cada palabra en mayúscula). |
| [`getCloudSQLConnection()`](#getCloudSQLConnection) | Establece una conexión con una instancia de base de datos en Google Cloud SQL. |
| [`getColumnLetter()`](#getColumnLetter) | Convierte el número de la posición de la columna de una hoja de cálculo a su correspondiente letra. |
| [`getColumnNumber()`](#getColumnNumber) | Convierte la letra asociada a la columna de una hoja de cálculo a su correspondiente número. |
| [`getFormattedText()`](#getFormattedText) | Obtiene un texto formateado para comparación o búsqueda. |
| [`getKeyValue()`](#getKeyValue) | Encripta o desencripta un texto definido por parámetro. Esta función puede emplearse por ejemplo, para parámetros GET en la URL de una aplicación web. |
| [`getMySQLConnection()`](#getMySQLConnection) | Establece una conexión con una base de datos MySQL. |
| [`insertGetParams()`](#insertGetParams) | Inserta los parámetros definidos en un objeto como parámetros GET en una URL. |
| [`isValidEmail()`](#isValidEmail) | Valida si el texto definido por parámetro corresponde a una dirección de correo electrónico. |
| [`numberToRoman()`](#numberToRoman) | Convierte un número entero positivo a su valor equivalente en el sistema de numeración romano. |
| [`replaceLatinSymbols()`](#replaceLatinSymbols) | Reemplaza los acentos y caracteres latinos por las respectivas vocales. |
| [`romanToNumber()`](#romanToNumber) | Convierte un número romano a su valor equivalente en el sistema de numeración decimal. |

> (*) Solamente disponible del lado Google Apps Script.
> (**) Solamente disponible del lado JavaScript.

## combineObject()
Establece las propiedades de una variable de tipo Object sobre otra variable del mismo tipo.
```javascript
// Objetos de datos
var object1 = {name: "Pedro"};
var object2 = {name: "Pablo", age: 22};

myUtilities.combineObject(object1, object2); // Ó myUtilities.combineObject(object1, object2, true, true)
// Resultado: object1 = {name: "Pablo", age: 22}

myUtilities.combineObject(object1, object2, true, false);
// Resultado: object1 = {name: "Pablo"}

myUtilities.combineObject(object1, object2, false, true);
// Resultado: object1 = {name: "Pedro", age: 22}

// Esta opción no realiza cambio alguno en el objeto del primer parámetro
myUtilities.combineObject(object1, object2, false, false);
```

**Parámetros**

| Nombre  | Tipo | Descripción |
| - | - | - |
| obj | `Object` | Objeto sobre el cual se actualizará las propiedades. |
| src | `Object` | Objeto del cual se obtienen los valores a establecer en `obj`. |
| updateValues | `Boolean` | Valor de verdad que indica si se actualiza o no los los valores definidos en el objeto `src` que existen en el objeto `obj`. Valor por defecto: `true`. |
| updateIndex | `Boolean` | Valor de verdad que indica si se establece o no los atributos de objeto `src` que no existen en el objeto `obj`. Valor por defecto: `true`. |


## getCapitalizeText()
Convierte un texto a notación Camel Case (primer caracter de cada palabra en mayúscula).
```javascript
// Nombre de una persona
var name = "jorge abelardo pacheco";
// Ejemplo de uso de la función
name = myUtilities.getCapitalizeText(name);
// Salida: "Jorge Abelardo Pacheco"
```

**Parámetros**

| Nombre  | Tipo | Descripción |
| - | - | - |
| text | `String` | Texto del cual se desea aplicar la notación. |

**Return**

**String** - Texto en notación Camel Case.

## getCloudSQLConnection()
Establece una conexión con una instancia de base de datos en Google Cloud SQL.
```javascript
// Valores requeridos para conectar la aplicación a una instancia de base de datos en Google Cloud SQL.
var instanceName = "CLOUD_SQL_INSTANCE_NAME";
var userName = "DATABASE_USERNAME";
var password = "DATABASE_USERPASSWORD";
var database = "DATABASE_NAME";

// Ejemplo de uso de la función
var connection = myUtilities.getCloudSQLConnection(instanceName, userName, password, database);
```
> Por medio de la variable `connection` se invoca cada una de las funciones definidas en la sección [`JdbcInstance`](#JdbcInstance).

**Parámetros**

| Nombre  | Tipo | Descripción |
| - | - | - |
| instanceName | `String` | Nombre de la instancia de Cloud SQL. |
| userName | `String` | Nombre de usuario de la base de datos. |
| password | `String` | Contraseña del usuario de la base de datos. |
| database | `String` | Nombre de la base de datos. |

**Return**

**JdbcInstance** - Instancia a las funciones que se pueden ejecutar sobre una conexión a la base de datos. Para más información, consultar la sección [`JdbcInstance`](#JdbcInstance).

## getColumnLetter()
Convierte el número de la posición de la columna de una hoja de cálculo a su correspondiente letra.
```javascript
// Número de columna
var columnNumber = 22;
// Ejemplo de uso de la función
var columnLetter = myUtilities.getColumnLetter(columnNumber);
// Salida: "V"
```

**Parámetros**

| Nombre  | Tipo | Descripción |
| - | - | - |
| columnNumber | `Number` | Número de columna de la hoja de cálculo. |

**Return**

**String** - Posición en la columna en notación A1 (letra del alfabeto).

## getColumnNumber()
Convierte la letra asociada a la columna de una hoja de cálculo a su correspondiente número.
```javascript
// Letra asociada a la columna de la Hoja de cálculo
var columnLetter = "AB";
// Ejemplo de uso de la función
var columnNumber = myUtilities.getColumnNumber(columnLetter);
// Salida: 28
```

**Parámetros**

| Nombre  | Tipo | Descripción |
| - | - | - |
| columnLetter | `String` | Letra asociada a la columna de la hoja de cálculo. |

**Return**

**Number** - Posición de la columna.

## getFormattedText()
Obtiene un texto formateado para comparación o búsqueda.
```javascript
// Valor a formatear
var text = "  Google Apps Script  ";
// Ejemplo de uso de la función
text = myUtilities.getFormattedText(text);
// Salida: "google apps script"
```

**Parámetros**

| Nombre  | Tipo | Descripción |
| - | - | - |
| textValue | `String` | Texto que se desea formatear. |
| transformFunctionName | `String` | Nombre de la función que indica si el texto se convierte a minúscula (`toLowerCase`) o mayúscula (`toUpperCase`). Valor por defecto: `toLowerCase`. |
| replaceVowels | `Boolean` | Valor de verdad que indica si se reemplaza valores acentuados por las equivalentes vocales. Valor por defecto: `true`. |

**Return**

**String** - Texto formateado, de acuerdo a los parámetros indicados.

## getKeyValue()
Encripta o desencripta un texto definido por parámetro. Esta función puede emplearse por ejemplo, para parámetros GET en la URL de una aplicación web.
```javascript
// Valor de ejemplo
var parameter = "123abc";

// Valor encriptado
var encryptedValue = myUtilities.getKeyValue(parameter, true);

// Valor desencriptado (Resultado: el valor original)
var desencryptedValue = myUtilities.getKeyValue(encryptedValue, false);
```

**Parámetros**

| Nombre  | Tipo | Descripción |
| - | - | - |
| value | `String` | Valor a encriptar y desencriptar. |
| encrypt | `Boolean` | Valor de verdad que indica si se encripta (`true`) o desencripta (`false`) el valor definido en el parámetro `value`. |

**Return**

**String** - Valor encriptado o desencriptado del parámetro `value`.

## getMySQLConnection()
Establece una conexión con una base de datos MySQL.
```javascript
// Valores requeridos para conectar la aplicación a una instancia de base de datos en Google Cloud SQL.
var url = "DATABASE_URL";
var userName = "DATABASE_USERNAME";
var password = "DATABASE_USERPASSWORD";
var database = "DATABASE_NAME";

// Ejemplo de uso de la función
var connection = myUtilities.getMySQLConnection(url, userName, password, database);
```
> Por medio de la variable `connection` se invoca cada una de las funciones definidas en la sección [`JdbcInstance`](#JdbcInstance).

**Parámetros**

| Nombre  | Tipo | Descripción |
| - | - | - |
| url | `String` | URL del servidor donde se encuentra la base de daros. |
| userName | `String` | Nombre de usuario de la base de datos. |
| password | `String` | Contraseña del usuario de la base de datos. |
| database | `String` | Nombre de la base de datos. |

**Return**

**JdbcInstance** - Instancia a las funciones que se pueden ejecutar sobre una conexión a la base de datos. Para más información, consultar la sección [`JdbcInstance`](#JdbcInstance).

## insertGetParams()
Inserta los parámetros definidos en un objeto como parámetros GET en una URL.
```javascript
// URL a la cual se establecen los parámetros GET
var url = "www.sinova.co";
// Objeto con los parámetros a establecer
var parameters = {
  id: "1",
  name: "jorge",
  email: "usuario@correo.com"
};

// Ejemplo de uso de la función
url = myUtilities.insertGetParams(url, parameters);
// Salida: "www.sinova.co?id=1&name=jorge&email=usuario@correo.com"
```

**Parámetros**

| Nombre  | Tipo | Descripción |
| - | - | - |
| URL | `String` | URL a la cual se insertarán los parámetros GET. |
| parameters | `Object` | Objeto de datos con los parámetros a establecer en la URL. |

**Return**

**String** - URL con los parámetros GET establecidos.

## isValidEmail()
Valida si el texto definido por parámetro corresponde a una dirección de correo electrónico.
```javascript
// Variables con el nombre y correo de una persona
var name = "José Ernesto Padilla";
var email = "micorreo@empresa.com.co"

// Ejemplos de uso de la función
var validate1 = myUtilities.isValidEmail(name); // Resultado: FALSE
var validate2 = myUtilities.isValidEmail(email); // Resultado: TRUE
```

**Parámetros**

| Nombre  | Tipo | Descripción |
| - | - | - |
| email | `String` | Texto que se desea validar. |

**Return**

**Boolean** - Valor de verdad que indica si el valor del parámetro `email` corresponde o no a una dirección de correo electrónico (`true` o `false`, respectivamente).

## numberToRoman()
Convierte un número entero positivo a su valor equivalente en el sistema de numeración romano.
```javascript
// Número a convertir
var number = 19;
// Ejemplo de uso de la función
var romanNumber = myUtilities.numberToRoman(number);
// Resultado: "XIX"
```

**Parámetros**

| Nombre  | Tipo | Descripción |
| - | - | - |
| number | `Number` | Número entero a convertir. |

**Return**

**String** - Valor convertido al sistema de numeración romano.

## replaceLatinSymbols()
Reemplaza los acentos y caracteres latinos por las respectivas vocales.
```javascript
// Nombre que contiene acentos
var nombre = "Fabián González Muñoz";
// Se invoca la función
nombre = myUtilities.replaceLatinSymbols(nombre);
// Salida: Fabian Gonzalez Muñoz
```

**Parámetros**

| Nombre  | Tipo | Descripción |
| - | - | - |
| text | `String` | Texto del cual se desea reemplazar los acentos. |

**Return**

**String** - Texto con los acentos reemplazados.

## romanToNumber()
Convierte un número romano a su valor equivalente en el sistema de numeración decimal.
```javascript
// Número a convertir
var romanNumber = "XXI";
// Ejemplo de uso de la función
var number = myUtilities.romanToNumber(romanNumber);
// Resultado: 21
```

**Parámetros**

| Nombre  | Tipo | Descripción |
| - | - | - |
| romanNumber | `String` | Número romano a convertir. |

**Return**

**String** - Valor convertido al sistema de numeración decimal.

# JdbcInstance
Conjunto de funciones que se pueden emplear para registrar y consultar información sobre bases de datos MySQL.

| Función  | Descripción |
| - | - |
| [`select()`](#select) | Establece las propiedades de una variable de tipo Object sobre otra variable del mismo tipo. |
| [`insert()`](#insert) | Establece las propiedades de una variable de tipo Object sobre otra variable del mismo tipo. |
| [`insertBatch()`](#insertBatch) | Establece las propiedades de una variable de tipo Object sobre otra variable del mismo tipo. |
| [`update()`](#update) | Establece las propiedades de una variable de tipo Object sobre otra variable del mismo tipo. |
| [`remove()`](#remove) | Establece las propiedades de una variable de tipo Object sobre otra variable del mismo tipo. |
| [`replace()`](#replace) | Establece las propiedades de una variable de tipo Object sobre otra variable del mismo tipo. |
| [`replaceBatch()`](#replaceBatch) | Establece las propiedades de una variable de tipo Object sobre otra variable del mismo tipo. |