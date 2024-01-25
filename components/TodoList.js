/**
 * @typedef {object} Todo
 * @property {number} id
 * @property {string} title
 * @property {boolean} completed
 */

import { createElement } from "../functions/dom.js"

export class TodoList {

    /** @type {Todo[]} */
    #todos =[]
    

    /**
     * @param {Todo[]} todos 
     */
    constructor (todos){
        this.#todos = todos
    }

    /**
     * @param {HTMLElement} element 
     */
    appendTo (element){
        element.innerHTML = `
        <form class="d-flex pb-4">
            <input required="" class="form-control" type="text" placeholder="Acheter des patates..." name="title" data-com.bitwarden.browser.user-edited="yes">
            <button class="btn btn-primary">Ajouter</button>
        </form>
        <main>
            <div class="btn-group mb-4" role="group">
                <button type="button" class=" btn btn-outline-primary active" data-filter="all">Toutes</button>
                <button type="button" class=" btn btn-outline-primary" data-filter="todo">A faire</button>
                <button type="button" class=" btn btn-outline-primary" data-filter="done">Faites</button>
            </div>

            <ul class="list-group">
            
                <li class="todo list-group-item d-flex align-items-center">
                    <input class="form-check-input" type="checkbox" id="todo-1">
                    <label class="ms-2 form-check-label" for="todo-1">
                        Tâche à faire 2
                    </label>
                    <label class="ms-auto btn btn-danger btn-sm">
                    <i class="bi-trash">
                    </i>
                    </label>
                </li>
                
            </ul>
        </main>`
        const list = element.querySelector('.list-group')
        for (let todo of this.#todos){
            const t = new TodoListItem(todo)
            t.appendTo(list)
        }
    }
}

class TodoListItem {

    #element

    /** @type {Todo} */
    constructor (todo){
        const id = `todo-${todo.id}`
        const li = createElement('li', {
            class: 'todo list-group-item d-flex align-items-center'
        })
        const checkbox = createElement('input', {
            type: 'checkbox',
            class: 'form-check-input',
            id: id,
            checked: todo.completed
        })
        const label = createElement('label', {
            class: 'ms-2 form-check-label',
            for: id
        })
        label.innerText = todo.title
        const button = createElement('button',{
            class: 'ms-auto btn btn-danger btn-sm'
        })   
        button.innerHTML = '<i class="bi-trash"></i>'  

        li.append(checkbox)
        li.append(label)
        li.append(button)
        this.#element = li
    }

    /**
     * 
     * @param {HTMLElement} element 
     */
    appendTo(element){
        element.append(this.#element)
    }
}