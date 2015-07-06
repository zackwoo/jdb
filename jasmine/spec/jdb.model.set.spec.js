define([
  'jquery',
  'jdbModel'
], function($, model) {
  'use strict';
   describe("JDB model 模块 SET 方法测试", function() {
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

    it("设置string类型值", function() {
      mock.name.set("aaron")
      expect(data.name).toBe("aaron");
    });

    it("设置number类型值", function() {
      mock.age.set(20)
      expect(data.age).toBe(20);
    });

    it("设置Date类型值", function() {
      mock.birthday.set(new Date("2011-11-11"))
      expect(data.birthday).toEqual(new Date("2011-11-11"));
    });

    it("设置嵌套对象的string类型值", function() {
      mock.defaultUser.name.set("new name")
      expect(data.defaultUser.name).toBe("new name");
    });

    it("设置number类型值", function() {
      mock.defaultUser.age.set(21)
      expect(data.defaultUser.age).toBe(21);
    });

    it("设置Date类型值", function() {
      mock.defaultUser.birthday.set(new Date("2011-11-11"))
      expect(data.defaultUser.birthday).toEqual(new Date("2011-11-11"));
    });

    it("设置数组类型中string类型值", function() {
      mock.list[0].set("test123");
      expect(data.list[0]).toEqual("test123");
    });
    it("设置数组类型中int类型值", function() {
      mock.list[1].set(33);
      expect(data.list[1]).toEqual(33);
    }); 
    it("设置数组类型中object类型值", function() {
      mock.list[2].name.set(33);
      expect(data.list[2].name).toEqual(33);
    });    

  });

});