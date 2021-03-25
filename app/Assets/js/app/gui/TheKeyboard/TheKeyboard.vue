<template>
    <div class="aspect-wrapper">
        <div class="aspect-wrapper-insides">
            <div class="key-frame">
                <ul v-for="row in currentLayout" class="key-row" :class="rowClass(row)">
                    <li v-for="key in row.keys" class="key-item" :class="keyClass(key)"
                        v-on:mouseup="onAction(key)">
                        <span v-html="keyCap(key)"></span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

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
    pointer-events: auto;
    width: 100%;
    height: 100%;
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
    margin: 5px;
    color: #aaaaaa;
    font-weight: bold;
    font-size: 3em;
    text-align: center;
    flex-grow: 1;
    align-items: center;
    display: flex;
    justify-content: center;
    border-radius: 20px;
    text-shadow: 0 2px 3px white;
    background: linear-gradient(to bottom, #e8e8e8 0%,#eeeff1 65%, #eae7e7 100%);
    box-shadow: 0 5px 7px 2px #000000;
    border-bottom: solid 6px #c9c7c7;
    border-top: solid 4px white;
}

.key-item-4 {
    flex-grow: 5;
}

.key-item-2 {
    flex-grow: 1.5;
}

.key-color-alt {
    color: #8d8d8d;
    text-shadow: 0 2px 3px rgba(220, 219, 219,1);
    background: linear-gradient(to bottom, #a8a8a8 0%, #b3b6bb 65%, #b3b3b3 100%);
    border-bottom: solid 6px #909090;
    border-top: solid 4px rgba(220, 219, 219,1);
}

.key-item:hover {
    color: #807b7b;
    background: linear-gradient(to bottom, #cdcdcd 0%, #cccfd5 65%, #b6b1b1 100%);
    border-bottom: solid 4px #7d7a7a;
    border-top: solid 2px white;
    box-shadow: 0 5px 4px 1px #000000;
}

.key-color-alt:hover {
    color: #635c5c;
    text-shadow: 0 2px 3px rgb(196, 190, 190);
    background: linear-gradient(to bottom, #7b7a7a 0%, #929ba0 65%, #8d8686 100%);
    border-bottom: solid 4px #585050;
    border-top: solid 2px rgba(220, 219, 219,1);
    box-shadow: 0 5px 4px 1px #000000;
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
}

.aspect-wrapper {
    position: relative;
    width: 100%;
    padding-top: 55%;
}

.aspect-wrapper-insides {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

</style>
