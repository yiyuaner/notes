; ModuleID = 'test.ll'
source_filename = "test.ll"

@undefined_val = external global i8*
@hole_val = external global i8*
@str.0 = private unnamed_addr constant [5 x i8] c"name\00", align 1
@str.1 = private unnamed_addr constant [4 x i8] c"age\00", align 1
@str.2 = private unnamed_addr constant [3 x i8] c"id\00", align 1
@str.3 = private unnamed_addr constant [8 x i8] c"console\00", align 1
@str.4 = private unnamed_addr constant [4 x i8] c"log\00", align 1
@str.5 = private unnamed_addr constant [21 x i8] c"Happy birthday! Now \00", align 1
@str.6 = private unnamed_addr constant [12 x i8] c" years old.\00", align 1
@str.7 = private unnamed_addr constant [19 x i8] c"Hello, my name is \00", align 1
@str.8 = private unnamed_addr constant [11 x i8] c" and I am \00", align 1
@str.9 = private unnamed_addr constant [10 x i8] c"prototype\00", align 1
@str.10 = private unnamed_addr constant [6 x i8] c"Alice\00", align 1
@str.11 = private unnamed_addr constant [4 x i8] c"Bob\00", align 1
@str.12 = private unnamed_addr constant [6 x i8] c"greet\00", align 1
@str.13 = private unnamed_addr constant [16 x i8] c"Person 1 name: \00", align 1
@str.14 = private unnamed_addr constant [1 x i8] zeroinitializer, align 1
@str.15 = private unnamed_addr constant [14 x i8] c"Person 1 ID: \00", align 1
@str.16 = private unnamed_addr constant [6 x i8] c"getId\00", align 1
@str.17 = private unnamed_addr constant [18 x i8] c"celebrateBirthday\00", align 1

declare i8* @ArkLoadProperty(i8*, i8*)

declare void @ArkStoreProperty(i8*, i8*, i8*)

declare i8* @ArkLoadGlobal(i8*)

declare i8* @ArkNewObject(i8*, ...)

declare i8* @ArkDefineClass(i8*, i8*)

declare i8* @ArkCallMethod(i8*, i8*, ...)

declare i8* @ArkAdd(i8*, i8*)

declare i8* @ArkLoadHole()

declare i8* @ArkLoadInt(i32)

define i8* @Person(i8* %v0, i8* %v1, i8* %v2, i8* %v3, i8* %v4, i8* %v5) {
bb1:

bb0:                                              ; No predecessors!
  call void @ArkStoreProperty(i8* %v2, i8* getelementptr inbounds ([5 x i8], [5 x i8]* @str.0, i32 0, i32 0), i8* %v3)
  call void @ArkStoreProperty(i8* %v2, i8* getelementptr inbounds ([4 x i8], [4 x i8]* @str.1, i32 0, i32 0), i8* %v4)
  call void @ArkStoreProperty(i8* %v2, i8* getelementptr inbounds ([3 x i8], [3 x i8]* @str.2, i32 0, i32 0), i8* %v5)
  ret i8* %v2

bb2:                                              ; No predecessors!
}

define i8* @celebrateBirthday(i8* %v0, i8* %v1, i8* %v2) {
bb1:
  %const = alloca i32, align 4
  store i32 1, i32* %const, align 4

bb0:                                              ; No predecessors!
  %val = call i8* @ArkLoadProperty(i8* %v2, i8* getelementptr inbounds ([4 x i8], [4 x i8]* @str.1, i32 0, i32 0))
  %res_add = call i8* @ArkAdd(i8* %val, i32* %const)
  call void @ArkStoreProperty(i8* %v2, i8* getelementptr inbounds ([4 x i8], [4 x i8]* @str.1, i32 0, i32 0), i8* %res_add)
  %val1 = call i8* @ArkLoadGlobal(i8* getelementptr inbounds ([8 x i8], [8 x i8]* @str.3, i32 0, i32 0))
  %val2 = call i8* @ArkLoadProperty(i8* %val1, i8* getelementptr inbounds ([4 x i8], [4 x i8]* @str.4, i32 0, i32 0))
  %val3 = call i8* @ArkLoadProperty(i8* %v2, i8* getelementptr inbounds ([4 x i8], [4 x i8]* @str.1, i32 0, i32 0))
  %res_add4 = call i8* @ArkAdd(i8* getelementptr inbounds ([21 x i8], [21 x i8]* @str.5, i32 0, i32 0), i8* %val3)
  %res_add5 = call i8* @ArkAdd(i8* %res_add4, i8* getelementptr inbounds ([12 x i8], [12 x i8]* @str.6, i32 0, i32 0))
  %call_result = call i8* (i8*, i8*, ...) @ArkCallMethod(i8* %val2, i8* %val1, i8* %res_add5)
  %undefined = load i8*, i8** @undefined_val, align 8
  ret i8* %undefined

bb2:                                              ; No predecessors!
}

define i8* @getId(i8* %v0, i8* %v1, i8* %v2) {
bb1:

bb0:                                              ; No predecessors!
  %val = call i8* @ArkLoadProperty(i8* %v2, i8* getelementptr inbounds ([3 x i8], [3 x i8]* @str.2, i32 0, i32 0))
  ret i8* %val

bb2:                                              ; No predecessors!
}

define i8* @greet(i8* %v0, i8* %v1, i8* %v2) {
bb1:

bb0:                                              ; No predecessors!
  %val = call i8* @ArkLoadProperty(i8* %v2, i8* getelementptr inbounds ([5 x i8], [5 x i8]* @str.0, i32 0, i32 0))
  %res_add = call i8* @ArkAdd(i8* getelementptr inbounds ([19 x i8], [19 x i8]* @str.7, i32 0, i32 0), i8* %val)
  %res_add1 = call i8* @ArkAdd(i8* %res_add, i8* getelementptr inbounds ([11 x i8], [11 x i8]* @str.8, i32 0, i32 0))
  %val2 = call i8* @ArkLoadProperty(i8* %v2, i8* getelementptr inbounds ([4 x i8], [4 x i8]* @str.1, i32 0, i32 0))
  %res_add3 = call i8* @ArkAdd(i8* %res_add1, i8* %val2)
  %res_add4 = call i8* @ArkAdd(i8* %res_add3, i8* getelementptr inbounds ([12 x i8], [12 x i8]* @str.6, i32 0, i32 0))
  ret i8* %res_add4

bb2:                                              ; No predecessors!
}

define i8* @func_main_0(i8* %v0, i8* %v1, i8* %v2) {
bb1:
  %const = alloca i32, align 4
  store i32 30, i32* %const, align 4
  %const1 = alloca i32, align 4
  store i32 1001, i32* %const1, align 4
  %const2 = alloca i32, align 4
  store i32 25, i32* %const2, align 4
  %const3 = alloca i32, align 4
  store i32 1002, i32* %const3, align 4

bb0:                                              ; No predecessors!
  %hole_ptr = alloca i8*, align 8
  %hole = load i8*, i8** @hole_val, align 8
  store i8* %hole, i8** %hole_ptr, align 8
  %new_cls_obj = call i8* @ArkDefineClass(i8* bitcast (i8* (i8*, i8*, i8*, i8*, i8*, i8*)* @Person to i8*), i8** %hole_ptr)
  %val = call i8* @ArkLoadProperty(i8* %new_cls_obj, i8* getelementptr inbounds ([10 x i8], [10 x i8]* @str.9, i32 0, i32 0))
  %new_obj = call i8* (i8*, ...) @ArkNewObject(i8* %new_cls_obj, i8* getelementptr inbounds ([6 x i8], [6 x i8]* @str.10, i32 0, i32 0), i32* %const, i32* %const1)
  %new_obj4 = call i8* (i8*, ...) @ArkNewObject(i8* %new_cls_obj, i8* getelementptr inbounds ([4 x i8], [4 x i8]* @str.11, i32 0, i32 0), i32* %const2, i32* %const3)
  %val5 = call i8* @ArkLoadGlobal(i8* getelementptr inbounds ([8 x i8], [8 x i8]* @str.3, i32 0, i32 0))
  %val6 = call i8* @ArkLoadProperty(i8* %val5, i8* getelementptr inbounds ([4 x i8], [4 x i8]* @str.4, i32 0, i32 0))
  %val7 = call i8* @ArkLoadProperty(i8* %new_obj, i8* getelementptr inbounds ([6 x i8], [6 x i8]* @str.12, i32 0, i32 0))
  %call_result = call i8* (i8*, i8*, ...) @ArkCallMethod(i8* %val7, i8* %new_obj)
  %call_result8 = call i8* (i8*, i8*, ...) @ArkCallMethod(i8* %val6, i8* %val5, i8* %call_result)
  %val9 = call i8* @ArkLoadGlobal(i8* getelementptr inbounds ([8 x i8], [8 x i8]* @str.3, i32 0, i32 0))
  %val10 = call i8* @ArkLoadProperty(i8* %val9, i8* getelementptr inbounds ([4 x i8], [4 x i8]* @str.4, i32 0, i32 0))
  %val11 = call i8* @ArkLoadProperty(i8* %new_obj4, i8* getelementptr inbounds ([6 x i8], [6 x i8]* @str.12, i32 0, i32 0))
  %call_result12 = call i8* (i8*, i8*, ...) @ArkCallMethod(i8* %val11, i8* %new_obj4)
  %call_result13 = call i8* (i8*, i8*, ...) @ArkCallMethod(i8* %val10, i8* %val9, i8* %call_result12)
  %val14 = call i8* @ArkLoadGlobal(i8* getelementptr inbounds ([8 x i8], [8 x i8]* @str.3, i32 0, i32 0))
  %val15 = call i8* @ArkLoadProperty(i8* %val14, i8* getelementptr inbounds ([4 x i8], [4 x i8]* @str.4, i32 0, i32 0))
  %val16 = call i8* @ArkLoadProperty(i8* %new_obj, i8* getelementptr inbounds ([5 x i8], [5 x i8]* @str.0, i32 0, i32 0))
  %res_add = call i8* @ArkAdd(i8* getelementptr inbounds ([16 x i8], [16 x i8]* @str.13, i32 0, i32 0), i8* %val16)
  %res_add17 = call i8* @ArkAdd(i8* %res_add, i8* getelementptr inbounds ([1 x i8], [1 x i8]* @str.14, i32 0, i32 0))
  %call_result18 = call i8* (i8*, i8*, ...) @ArkCallMethod(i8* %val15, i8* %val14, i8* %res_add17)
  %val19 = call i8* @ArkLoadGlobal(i8* getelementptr inbounds ([8 x i8], [8 x i8]* @str.3, i32 0, i32 0))
  %val20 = call i8* @ArkLoadProperty(i8* %val19, i8* getelementptr inbounds ([4 x i8], [4 x i8]* @str.4, i32 0, i32 0))
  %val21 = call i8* @ArkLoadProperty(i8* %new_obj, i8* getelementptr inbounds ([6 x i8], [6 x i8]* @str.16, i32 0, i32 0))
  %call_result22 = call i8* (i8*, i8*, ...) @ArkCallMethod(i8* %val21, i8* %new_obj)
  %res_add23 = call i8* @ArkAdd(i8* getelementptr inbounds ([14 x i8], [14 x i8]* @str.15, i32 0, i32 0), i8* %call_result22)
  %res_add24 = call i8* @ArkAdd(i8* %res_add23, i8* getelementptr inbounds ([1 x i8], [1 x i8]* @str.14, i32 0, i32 0))
  %call_result25 = call i8* (i8*, i8*, ...) @ArkCallMethod(i8* %val20, i8* %val19, i8* %res_add24)
  %val26 = call i8* @ArkLoadProperty(i8* %new_obj, i8* getelementptr inbounds ([18 x i8], [18 x i8]* @str.17, i32 0, i32 0))
  %call_result27 = call i8* (i8*, i8*, ...) @ArkCallMethod(i8* %val26, i8* %new_obj)
  %val28 = call i8* @ArkLoadGlobal(i8* getelementptr inbounds ([8 x i8], [8 x i8]* @str.3, i32 0, i32 0))
  %val29 = call i8* @ArkLoadProperty(i8* %val28, i8* getelementptr inbounds ([4 x i8], [4 x i8]* @str.4, i32 0, i32 0))
  %val30 = call i8* @ArkLoadProperty(i8* %new_obj, i8* getelementptr inbounds ([6 x i8], [6 x i8]* @str.12, i32 0, i32 0))
  %call_result31 = call i8* (i8*, i8*, ...) @ArkCallMethod(i8* %val30, i8* %new_obj)
  %call_result32 = call i8* (i8*, i8*, ...) @ArkCallMethod(i8* %val29, i8* %val28, i8* %call_result31)
  %undefined = load i8*, i8** @undefined_val, align 8
  ret i8* %undefined

bb2:                                              ; No predecessors!
}
