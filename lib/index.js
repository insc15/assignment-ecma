import Navigo from "navigo";
import axios from "axios";
import footer from "../src/components/footer";
import header from "../src/components/header";
const router = new Navigo("/", { linksSelector: "a", hash: false });

const RemoveDuplicates = (array, key) => {
    return array.reduce((result, currentItem) => {
      const uniqueItem = result.filter(i => i[key] !== currentItem[key]);
      return [...uniqueItem, currentItem];
    }, []);
};

const getCategoriesFromDatabase = async function(){
    const database = (await axios('http://localhost:3000/books')).data
    return RemoveDuplicates(database.map(item => item.categories), 'id')
}

const getRelatedByCategory = async function(product){
    const database = (await axios('http://localhost:3000/books')).data
    return database.filter(item => item.categories.id === product.categories.id && item.isHidden !== false && item.id !== product.id)
}

let effects = [];
let currentEffectOrder = 0;

let rootComponent = null;
let rootContainer = null;

let states = [];
let currentStateOrder = 0;

const debounce = (fn, timeout = 100) => {
    let timeId = null;

    return (...rest) => {
        if (timeId) clearTimeout(timeId);

        timeId = setTimeout(() => fn(...rest), timeout);
    };
};

const render = (component, container) => {
    container.innerHTML = component();

    rootComponent = component;
    rootContainer = container;

    effects.forEach((effect) => {
        effect.cb();
    });
};

const rerender = debounce(() => {
    currentStateOrder = 0;
    currentEffectOrder = 0;
    rootContainer.innerHTML = rootComponent();

    effects.forEach((effect) => {
        // shouldRunEffect = true khi không truyền deps hoặc deps khác nhau
        const shouldRunEffect =
            !effect.nextDeps ||
            effect.nextDeps?.some((dep, i) => {
                return dep !== effect?.prevDeps?.[i];
            });

        if (shouldRunEffect) {
            effect.cb();
        }
    });
});

const useState = (initialState) => {
    let state;
    let stateOrder = currentStateOrder;

    if (states[stateOrder] !== undefined) {
        state = states[stateOrder];
    } else {
        state = states[stateOrder] = initialState;
    }

    const updater = (newState) => {
        if (newState === undefined) {
            throw new Error("New state must not be undefined");
        }

        if (typeof newState === "function") {
            states[stateOrder] = newState(states[stateOrder]);
        } else {
            states[stateOrder] = newState;
        }

        rerender();
    };

    currentStateOrder++;

    return [state, updater];
};

const useEffect = (cb, deps) => {
    let effectOrder = currentEffectOrder;

    if (!effects[effectOrder]) {
        effects.push({
            cb: cb,
            prevDeps: null,
            nextDeps: deps,
        });
    } else {
        effects[effectOrder] = {
            cb: cb,
            prevDeps: effects[effectOrder].nextDeps,
            nextDeps: deps,
        };
    }

    currentEffectOrder++;
};

router.on("/*", () => {}, {
    before(done, match) {
        states = [];
        currentStateOrder = 0;
        effects = [];
        currentEffectOrder = 0;
        done();
    },
});

export { render, useState, useEffect, router,RemoveDuplicates, getCategoriesFromDatabase, getRelatedByCategory };
