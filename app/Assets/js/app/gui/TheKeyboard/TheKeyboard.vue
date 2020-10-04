<template>
    <div class="key-frame">
        <ul v-for="row in currentLayout" class="key-row" :class="rowClass(row)">
            <li v-for="key in row.keys" class="key-item" :class="keyClass(key)"
                v-on:mouseup="onAction(key)">
                <span v-html="keyCap(key)"></span>
            </li>
        </ul>
    </div>
</template>

<script>
/*
    TODO:
    5) styling
 */
export default {
    name: "TheKeyboard",
    data: function () {
        return {
            selectedLayoutName: "default",
            toggleState: {},
            transform: {
                upperCase: false
            }
        }
    },
    props: {
        layout: {
            type: Object,
            required: true
        },
        inputElement: {
            type: Object,
            required: false
        }
    },
    methods: {
        rowClass(rowObject) {
            let cls = "";
            if (typeof rowObject.height !== 'undefined') {
                cls += " key-row-" + rowObject.height + " ";
            }
            return cls;
        },
        keyClass(keyObject) {
            let cls = "";
            if (typeof keyObject.size !== 'undefined') {
                cls += " key-item-" + keyObject.size + " ";
            }
            if (typeof keyObject.color !== 'undefined') {
                cls += " key-color-" + keyObject.color + " ";
            }
            if (typeof keyObject.toggle !== 'undefined'
                && typeof this.toggleState[keyObject.toggle] !== 'undefined'
                && this.toggleState[keyObject.toggle] === true) {
                cls += " key-toggle-on ";
            }
            if (this.transform.upperCase === true
                && typeof keyObject.transform !== 'undefined') {
                cls += " key-transform-uppercase ";
            }
            if (typeof keyObject.flex !== 'undefined') {
                cls += " key-flexible ";

            }
            return cls;
        },
        keyCap(keyObject) {
            return keyObject.cap;
        },
        onAction(keyObject) {
            if (typeof keyObject.toggle !== 'undefined') {
                if (typeof this.toggleState[keyObject.toggle] == 'undefined') {
                    this.$set(this.toggleState, keyObject.toggle, true);
                } else {
                    this.toggleState[keyObject.toggle] = !this.toggleState[keyObject.toggle];
                }
            }
            if (keyObject.action.indexOf("layout-") >= 0) {
                let layoutName = keyObject.action.replace("layout-", "");
                if (typeof this.layout[layoutName] != 'undefined') {
                    this.selectedLayoutName = layoutName;
                    return;
                }
            }
            if (keyObject.action === 'uppercase') {
                this.transform.upperCase = !this.transform.upperCase;
                return;
            }
            let string = keyObject.action;
            if (keyObject.action === 'space') {
                string = " ";
            }
            if (this.transform.upperCase === true
                && typeof keyObject.transform !== 'undefined') {
                string = string.toUpperCase();
            }
            this.$emit('key-press', string);
        }
    },
    computed: {
        currentLayout() {
            if (!this.layout) {
                throw new Error('layout prop is required');
            }
            if (typeof this.layout[this.selectedLayoutName] == 'undefined') {
                throw new Error(this.selectedLayoutName + ' keyboard layout not found');
            }
            return this.layout[this.selectedLayoutName];
        }
    },
    mounted: function () {
    }
}
</script>

<style scoped>
.key-frame {
    width: 100%;
    height: 800px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
}

.key-row {
    display: flex;
    flex-direction: row;
    flex-flow: row wrap;
    justify-content: space-around;
    padding: 0;
    margin: 0;
    list-style: none;
    flex-grow: 1;
    align-items: stretch;
}

.key-row-sm {
    flex-grow: 0.6;
}

.key-item {
    background: tomato;
    margin: 5px;
    color: white;
    font-weight: bold;
    font-size: 3em;
    text-align: center;
    flex-grow: 1;
    align-items: center;
    display: flex;
    justify-content: center;
    border-radius: 8px;
}

.key-item-4 {
    flex-grow: 5;
}

.key-item-2 {
    flex-grow: 1.5;
}

.key-color-alt {
    background: #c9412a;
}

.key-item:hover {
    background: #b13924;
}

.key-color-alt:hover {
    background: #8e291b;
}

.key-toggle-on {
    color: lightskyblue;
}

.key-transform-uppercase span {
    text-transform: uppercase;
}

.key-flexible span {
    width: 100% !important;
}

.key-item span {
    display: inline-block;
    width: 1em;
    height: 1.5em;
}

</style>
