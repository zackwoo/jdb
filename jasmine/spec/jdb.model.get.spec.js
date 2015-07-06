define([
  'jquery',
  'jdbModel'
], function($, model) {
  'use strict';
  describe("JDB model 模块 GET 方法测试", function() {
    var data;
    var mock;
    beforeEach(function() {
      data = {
        "name": "zack",
        "age": 18,
        "birthday": new Date("2015-06-01"),
        defaultUser: {
          "name": "aaron",
          "age": 20,
          "birthday": new Date("2013-06-03")
        },
        list: [
          "name",
          12, {
            "name": "listname",
            "age": 22,
            "birthday": new Date("2011-06-03")
          }
        ]
      };
      mock = model.wrap(data);
    });

    it("获取string类型值", function() {
      expect(mock.name.get()).toBe("zack");
    });
    it("获取number类型值", function() {
      expect(mock.age.get()).toBe(18);
    });
    it("获取Date类型值", function() {
      expect(mock.birthday.get()).toEqual(new Date("2015-06-01"));
    });
    it("获取嵌套对象的string类型值", function() {
      expect(mock.defaultUser.name.get()).toBe("aaron");
    });
    it("获取嵌套对象的number类型值", function() {
      expect(mock.defaultUser.age.get()).toBe(20);
    });
    it("获取嵌套对象的Date类型值", function() {
      expect(mock.defaultUser.birthday.get()).toEqual(new Date("2013-06-03"));
    });
    it("获取数组对象String类型值", function() {
      expect(mock.list[0].get()).toEqual("name");
    });
    it("获取数组对象number类型值", function() {
      expect(mock.list[1].get()).toEqual(12);
    });
    it("获取数组对象object类型值", function() {
      expect(mock.list[2].name.get()).toEqual("listname");
    });
    it("表达式get获取值", function() {
      expect(model.get(mock,"defaultUser.name").get()).toEqual("aaron");
    });
    it("表达式get获取数组值", function() {
      expect(model.get(mock,"list[0]").get()).toEqual("name");
    });
  });

});