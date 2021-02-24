export  var data=

  {
    type: "ConditionBuilder",
    props: {

      QuickPanel: [
        {
          id: 1,
          content: "And",
          type: "Operator",
          component: "And",
          componentType: "Operator"
        },
        {
         id: 2,
          content: "Or",
         type: "Operator",
          component: "Or",
         componentType: "Operator"
        },
        {
         id: 3,
          content: ">",
         type: "Operator",
         componentType: "Operator",
          component: ">"
        },
        {
         id: 4,
          component: ">=",
         type: "Operator",
         componentType: "Operator",
          content: ">="
        },
        {
         id: 5,
          component: "<",
         type: "Operator",
         componentType: "Operator",
          content: "<"
        },
        {
         id: 6,
          component: "<=",
         type: "Operator",
         componentType: "Operator",
          content: "<="
        },
        {
          id: 7,
           component: "==",
          type: "Operator",
          componentType: "Operator",
           content: "=="
         },
         {
          id: 8,
           component: "=",
          type: "Operator",
          componentType: "Operator",
           content: "="
         },
         {
          id: 9,
           component: "!=",
          type: "Operator",
          componentType: "Operator",
           content: "!="
         },
        {
         id: 10,
          content: "{}",
         componentType: "Operands",
         type: "Operands",
          component: "Brackets"
        },
        {
          id: 11,
           content: "+",
          type: "Operator",
           component: "+",
          componentType: "Operator"
         },
         {
          id: 12,
           content:  "-",
          type: "Operator",
           component: "-",
          componentType: "Operator"
         },
         {
          id: 13,
           content: "*",
          type: "Operator",
           component: "*",
          componentType: "Operator"
         },
         {
          id: 14,
           content:  "/",
          type: "Operator",
           component: "/",
          componentType: "Operator"
         }

      ],

      FixedValueHeader: "Fixed Values",
      FixedValueItem: [
        {
         id: 1,
          content: "Fixed Value",
         type: "Operands",
         componentType: "FixedValue",
          component: "FixedValue"
        }
      ],
      NumberFunctionHeader: "Number",
      NumberFunctionItem: [
        {
         id: 0,
          content: "Percentage",
         type: "Operands",
         componentType: "Function",
          component: "Percentage",
          returnType: "Integer",
          parameter: [
            "Integer"
          ],
          valueType: "Integer"
        },
        {
         id: 1,
          content: "Average",
         type: "Operands",
         componentType: "Function",
          component: "AVG",
          returnType: "Integer",
          parameter: [],
          valueType: "Integer"
        },
        {
         id: 2,
          content: "Minimum",
         componentType: "Function",
          component: "Min",
         type: "Operands",
          returnType: "Integer",
          parameter: [],
          valueType: "Integer"
        },
        {
         id: 3,
          content: "Maximum",
         componentType: "Function",
          component: "Max",
         type: "Operands",
          returnType: "Integer",
          parameter: [],
          valueType: "Integer"
        },
        {
         id: 4,
          content: "Absolute",
         type: "Operands",
          component: "||",
         componentType: "Function",
          returnType: "Integer",
          parameter: [
            "Integer"
          ],
          valueType: "Integer"
        },
        {
         id: 5,
          content: "Round",
         type: "Operands",
          component: "Round",
         componentType: "Function",
          returnType: "Integer",
          parameter: [
            "Integer"
          ],
          valueType: "Integer"
        },
        {
         id: 6,
          content: "Get Day",
         type: "Operands",
          component: "GetDay",
         componentType: "Function",
          returnType: "Integer",
          parameter: [
            "Date"
          ],
          valueType: "Integer"
        },
        {
         id: 7,
          content: "Get Month",
         type: "Operands",
          component: "GetMonth",
         componentType: "Function",
          returnType: "Integer",
          parameter: [
            "Date"
          ],
          valueType: "Integer"
        },
        {
         id: 7,
          content: "Get Year",
         type: "Operands",
          component: "GetYear",
         componentType: "Function",
          returnType: "Integer",
          parameter: [
            "Date"
          ],
          valueType: "Integer"
        },
        {
          id: 8,
           content: "Summation",
          type: "Operands",
           component: "Sum",
          componentType: "Function",
           returnType: "Integer",
           parameter: [
            "List","FieldPicklist"
           ],
           valueType: "Integer"
         },
         {
           id: 9,
            content: "Filter",
           type: "Operands",
            component: "Filter",
           componentType: "Function",
            returnType: "List",
            parameter: [
              "List", "FieldPicklist", "String"
            ],
            valueType: "Filter"
          }
      ],
      stringFunctionHeader: "String Built-in",
      stringFunctionItem: [
        {
         id: 0,
          content: "SubstringCost",
         type: "Operands",
         componentType: "Function",
          component: "SUB",
          returnType: "String",
          parameter: [
            "String",
            "Integer",
            "Integer"
          ],
          valueType: "String"
        },
        {
         id: 1,
          content: "To upper case",
         componentType: "Function",
          component: "ToUpper",
         type: "Operands",
          returnType: "String",
          parameter: [
            "String"
          ],
          valueType: "String"
        },
        {
         id: 2,
          content: "To lower case",
         componentType: "Function",
          component: "ToLower",
         type: "Operands",
          returnType: "String",
          parameter: [
            "String"
          ],
          valueType: "String"
        },
        {
         id: 3,
          content: "First upper case",
         type: "Operands",
         componentType: "Function",
          component: "FirstUpper",
          returnType: "String",
          parameter: [
            "String"
          ],
          valueType: "String"
        },
        {
         id: 4,
          content: "Contains",
         type: "Operands",
         componentType: "Function",
          component: "Contains",
          returnType: "String",
          parameter: [
            "String",
            "String"
          ],
          valueType: "String"
        },
        {
          id: 5,
           content: "ISNULL",
          type: "Operands",
          componentType: "Function",
           component: "ISNULL",
           returnType: "bool",
           parameter: [
             "String"
           ],
           valueType: "String"
         }
      ],
      dateFunctionHeader: "Date",
      dateFunctionItem: [
        {
         id: 0,
          content: "Add Days",
         type: "Operands",
         componentType: "Function",
          component: "AddDays",
          returnType: "Date",
          parameter: [
            "Date",
            "Integer"
          ],
          valueType: "Date"
        },
        {
         id: 1,
          content: "Add Months",
         componentType: "Function",
          component: "AddMonths",
         type: "Operands",
          returnType: "Date",
          parameter: [
            "Date",
            "Integer"
          ],
          valueType: "Date"
        },
        {
         id: 2,
          content: "Add Year",
         type: "Operands",
         componentType: "Function",
          component: "AddYear",
          returnType: "Date",
          parameter: [
            "Date",
            "Integer"
          ],
          valueType: "Date"
        },
        {
         id: 3,
          content: "Subtract Days",
         componentType: "Function",
          component: "SubtractDays",
         type: "Operands",
          returnType: "Date",
          parameter: [
            "Date",
            "Integer"
          ],
          valueType: "Date"
        },
        {
         id: 4,
          content: "Subtract Month",
         type: "Operands",
         componentType: "Function",
          component: "SubtractMonth",
          returnType: "Date",
          parameter: [
            "Date",
            "Integer"
          ],
          valueType: "Date"
        },
        {
         id: 5,
          content: "Subtract Year",
         type: "Operands",
         componentType: "Function",
          component: "SubtractYears",
          returnType: "Date",
          parameter: [
            "Date",
            "Integer"
          ],
          valueType: "Date"
        },
        {
         id: 6,
          content: "Minimum",
         type: "Operands",
         componentType: "Function",
          component: "Min",
          returnType: "Date",
          parameter: [],
          valueType: "Date"
        },
        {
         id: 8,
          content: "Maximum",
         type: "Operands",
         componentType: "Function",
          component: "Max",
          returnType: "Date",
          parameter: [],
          valueType: "Date"
        }
      ],
      relationalOperatorsHeader: "Relational operators",
      relationalOperatorsItem: [
        {
         id: 1,
          content: "GreaterThan",
         type: "Operator",
         componentType: "Operator",
          component: ">"
        },
        {
         id: 2,
          component: ">=",
         type: "Operator",
         componentType: "Operator",
          content: "GreaterThanEquel"
        },
        {
         id: 3,
          component: "<",
         type: "Operator",
         componentType: "Operator",
          content: "LessThan"
        },
        {
         id: 4,
          component: "<=",
         type: "Operator",
         componentType: "Operator",
          content: "LessThanEquel"
        },
        {
         id: 5,
          component: "==",
         type: "Operator",
         componentType: "Operator",
          content: "Equal"
        },
        {
         id: 6,
          component: "In",
         type: "Operator",
         componentType: "Operator",
          content: "IN"
        }
      ],
      logicalOperatorsHeader: "Logical operators",
      logicalOperatorsItem: [
        {
         id: 1,
          content: "And",
         type: "Operator",
          component: "And",
         componentType: "Operator"
        },
        {
         id: 2,
          content: "Or",
         type: "Operator",
          component: "Or",
         componentType: "Operator"
        },
        {
         id: 3,
          content: "Not",
         type: "Operator",
          component: "Not",
         componentType: "Operator"
        }
      ],
      expressionOperatorsHeader: "Expression Operators ",
      expressionOperatorsItem: [
        {
         id: 1,
          content: "Plus",
         type: "Operator",
          component: "+",
         componentType: "Operator"
        },
        {
         id: 2,
          content: "Minus",
         type: "Operator",
          component: "-",
         componentType: "Operator"
        },
        {
         id: 3,
          content: "Multiply",
         type: "Operator",
          component: "*",
         componentType: "Operator"
        },
        {
         id: 4,
          content: "Divide",
         type: "Operator",
          component: "/",
         componentType: "Operator"
        },
        {
         id: 5,
          content: "Remainder Calculation",
         type: "Operator",
          component: "MOD",
         componentType: "Operator"
        },
        {
         id: 6,
          component: "=",
         type: "Operator",
         componentType: "Operator",
          content: "Equal"
        }
      ],
      functionConvertType: [
        {
          language: "c#",
          functions: [
            {
              functionName:"SUB",
              functionFormula: "param1.Substring(param2,param3)"
            },
            {
              functionName:"Filter",
              functionFormula: "param1.FindAll(x=>x.param2 == param3)"
            },
            {
              functionName:"Sum",
              functionFormula: "param1.Sum(item => item.param2)"
            },
            {
              functionName:"Contains",
              functionFormula: "param1.Contains(param2)"
            },
            {
              functionName:"ISNULL",
              functionFormula: "IsNullOrEmpty(param1)"
            }
          ]
        },
        {
          language: "js",
          functions: [
            {
              functionName:"SUB",
              functionFormula: "param1.substr(param2,param3)"
            }
          ]
        }
      ],
      operatorsConvertType: [
        {
          language: "c#",
          operators: [
            {
              operatorName:"And",
              operatorFormula: "&&"
            },
            {
              operatorName:"Or",
              operatorFormula: "||"
            }
          ]
        },
        {
          language: "js",
          operators: [
            {
              operatorName:"And",
              operatorFormula: "&&"
            },
            {
              operatorName:"Or",
              operatorFormula: "||"
            }
          ]
        }
      ],
      operatorsFunctionConvertType: [
        {
          language: "c#",
          operators: [
            {
              operatorName:"=",
              operatorFormula: "equals"
            }
          ]
        }
      ],
      customOperandsHeader: "Custom Operands",
      customOperandsItem: [
        {
         id: 1,
          content: "X Integer",
         type: "Custom",
          component: "X",
         componentType: "Custom",
         valueType: "Integer"
        },
        {
         id: 2,
          content: "Y String",
         type: "Custom",
          component: "Y",
         componentType: "Custom",
         valueType: "String"
        },
        {
         id: 3,
          content: "Z Date",
         type: "Custom",
          component: "Z",
         componentType: "Custom",
         valueType: "Date"
        }
      ],

      fieldQueryFormula:"transactionData['{field}']",
      customQueryFormula:"{customItem}",
      queryTextFormula:"if({query}){return true;}else{return false;}",
       queryLanguange: "c#",
      isExpression:true,
      languageId:1
    }
  };

