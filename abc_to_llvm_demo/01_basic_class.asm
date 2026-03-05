# source binary: 01_basic_class.abc

# ====================
# LITERALS

0 0x485 { 10 [ string:"greet", method:#~@0>#greet, method_affiliate:0, string:"getId", method:#~@0>#getId, method_affiliate:0, string:"celebrateBirthday", method:#~@0>#celebrateBirthday, method_affiliate:0, i32:3, ]}
2 0x460 { 1 [ string:"Person", ]}
1 0x469 { 0 [
	MODULE_REQUEST_ARRAY: {
	};
]}

# ====================
# RECORDS

.language ArkTS
.record &mod_req_name& {
	u8 pkgName@entry = 0x0
	u8 isCommonjs = 0x0
	u8 hasTopLevelAwait = 0x0
	u8 isSharedModule = 0x0
	u32 scopeNames = 0x460
	u32 moduleRecordIdx = 0x469
}

.language ECMAScript
.record _ESConcurrentModuleRequestsAnnotation {
}

.language ECMAScript
.record _ESExpectedPropertyCountAnnotation {
}

.language ECMAScript
.record _ESSlotNumberAnnotation {
}

# ====================
# METHODS

L_ESExpectedPropertyCountAnnotation:
	u32 ExpectedPropertyCount { 0x3 }
L_ESSlotNumberAnnotation:
	u32 SlotNumber { 0x6 }
.language ArkTS
.function any &mod_req_name&.#~@0=#Person(any a0, any a1, any a2, any a3, any a4, any a5) <static> {
	lda a3
	stobjbyname 0x0, "name", a2
	lda a4
	stobjbyname 0x2, "age", a2
	lda a5
	stobjbyname 0x4, "id", a2
	lda a2
	return
}

L_ESSlotNumberAnnotation:
	u32 SlotNumber { 0xe }
.language ArkTS
.function any &mod_req_name&.#~@0>#celebrateBirthday(any a0, any a1, any a2) <static> {
	lda a2
	ldobjbyname 0x0, "age"
	sta v0
	ldai 0x1
	add2 0x2, v0
	stobjbyname 0x3, "age", a2
	tryldglobalbyname 0x5, "console"
	sta v0
	ldobjbyname 0x6, "log"
	sta v1
	lda.str "Happy birthday! Now "
	sta v2
	lda a2
	ldobjbyname 0x8, "age"
	add2 0xa, v2
	sta v2
	lda.str " years old."
	add2 0xb, v2
	sta v2
	lda v1
	callthis1 0xc, v0, v2
	returnundefined
}

L_ESSlotNumberAnnotation:
	u32 SlotNumber { 0x2 }
.language ArkTS
.function any &mod_req_name&.#~@0>#getId(any a0, any a1, any a2) <static> {
	lda a2
	ldobjbyname 0x0, "id"
	return
}

L_ESSlotNumberAnnotation:
	u32 SlotNumber { 0x8 }
.language ArkTS
.function any &mod_req_name&.#~@0>#greet(any a0, any a1, any a2) <static> {
	lda.str "Hello, my name is "
	sta v0
	lda a2
	ldobjbyname 0x0, "name"
	add2 0x2, v0
	sta v0
	lda.str " and I am "
	add2 0x3, v0
	sta v0
	lda a2
	ldobjbyname 0x4, "age"
	add2 0x6, v0
	sta v0
	lda.str " years old."
	add2 0x7, v0
	return
}

L_ESSlotNumberAnnotation:
	u32 SlotNumber { 0x3a }
.language ArkTS
.function any &mod_req_name&.func_main_0(any a0, any a1, any a2) <static> {
	ldhole
	sta v0
	defineclasswithbuffer 0x0, &mod_req_name&.#~@0=#Person:(any,any,any,any,any,any), { 10 [ string:"greet", method:#~@0>#greet, method_affiliate:0, string:"getId", method:#~@0>#getId, method_affiliate:0, string:"celebrateBirthday", method:#~@0>#celebrateBirthday, method_affiliate:0, i32:3, ]}, 0x3, v0
	sta v0
	ldobjbyname 0x1, "prototype"
	lda.str "Alice"
	sta v1
	ldai 0x1e
	sta v2
	ldai 0x3e9
	sta v3
	mov v5, v0
	mov v6, v1
	mov v7, v2
	mov v8, v3
	newobjrange 0x3, 0x4, v5
	sta v1
	lda.str "Bob"
	sta v2
	ldai 0x19
	sta v3
	ldai 0x3ea
	sta v4
	mov v5, v0
	mov v6, v2
	mov v7, v3
	mov v8, v4
	newobjrange 0x5, 0x4, v5
	sta v0
	tryldglobalbyname 0x7, "console"
	sta v2
	ldobjbyname 0x8, "log"
	sta v3
	lda v1
	ldobjbyname 0xa, "greet"
	callthis0 0xc, v1
	sta v4
	lda v3
	callthis1 0xe, v2, v4
	tryldglobalbyname 0x10, "console"
	sta v2
	ldobjbyname 0x11, "log"
	sta v3
	lda v0
	ldobjbyname 0x13, "greet"
	callthis0 0x15, v0
	sta v0
	lda v3
	callthis1 0x17, v2, v0
	tryldglobalbyname 0x19, "console"
	sta v0
	ldobjbyname 0x1a, "log"
	sta v2
	lda.str "Person 1 name: "
	sta v3
	lda v1
	ldobjbyname 0x1c, "name"
	add2 0x1e, v3
	sta v3
	lda.str ""
	add2 0x1f, v3
	sta v3
	lda v2
	callthis1 0x20, v0, v3
	tryldglobalbyname 0x22, "console"
	sta v0
	ldobjbyname 0x23, "log"
	sta v2
	lda.str "Person 1 ID: "
	sta v3
	lda v1
	ldobjbyname 0x25, "getId"
	callthis0 0x27, v1
	add2 0x29, v3
	sta v3
	lda.str ""
	add2 0x2a, v3
	sta v3
	lda v2
	callthis1 0x2b, v0, v3
	lda v1
	ldobjbyname 0x2d, "celebrateBirthday"
	callthis0 0x2f, v1
	tryldglobalbyname 0x31, "console"
	sta v0
	ldobjbyname 0x32, "log"
	sta v2
	lda v1
	ldobjbyname 0x34, "greet"
	callthis0 0x36, v1
	sta v1
	lda v2
	callthis1 0x38, v0, v1
	returnundefined
}

# ====================
# STRING

[offset:0x25a, name_value:]
[offset:0x25c, name_value: and I am ]
[offset:0x268, name_value: years old.]
[offset:0x292, name_value:Alice]
[offset:0x299, name_value:Bob]
[offset:0x29e, name_value:Happy birthday! Now ]
[offset:0x2b4, name_value:Hello, my name is ]
[offset:0x2c8, name_value:Person 1 ID: ]
[offset:0x2d7, name_value:Person 1 name: ]
[offset:0x2e8, name_value:age]
[offset:0x2ed, name_value:celebrateBirthday]
[offset:0x300, name_value:console]
[offset:0x309, name_value:getId]
[offset:0x310, name_value:greet]
[offset:0x317, name_value:id]
[offset:0x31b, name_value:log]
[offset:0x320, name_value:name]
[offset:0x326, name_value:prototype]
