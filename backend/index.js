/*---------------Funciones--------------------*/
function actualizarContador() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let contador = 0
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            contador++;
        }
    });
    document.getElementById('contador').innerText = contador
}
/*------------------Crear botones----------------*/
function guardar() {
    let task = document.getElementById('task')
    if (verificar(task.value.toLowerCase())==false){
        return false
    }
    task.textContent=''
    const table = document.getElementById('tbodyTask')
    const tr = document.createElement('tr');
    for (let i = 0; i < 3 ; i++) {
        const td = document.createElement('td');
        td.classList.add("col-4");
        if (i===0) {
            td.appendChild(check())
        }
        if (i===1) {
            td.textContent = task.value.toLowerCase();
            td.classList.add("parrafo");
        }
        if(i===2){
            td.appendChild(eliminar())
        }
        tr.appendChild(td)
        
    }
    table.appendChild(tr)
}
function check() {
    const check = document.createElement('input')
    check.type = 'checkbox'
    check.className = 'form-check-input'
    check.addEventListener('click', () => {
        actualizarContador()
    })
    return check
}
//
function eliminar() {
    const deletebtn = document.createElement('button')
    const img=document.createElement('img')
    img.src="../img/borrar.png"
    img.className="imgDelete"
    deletebtn.appendChild(img)
    deletebtn.className = 'btn-delete'
    deletebtn.addEventListener('click', (e) => {
        e.target.closest('tr').remove()
        actualizarContador()
    })
    return deletebtn
}
/*Eventos*/
document.querySelector('form').
    addEventListener('submit', e => {
        e.preventDefault()
        guardar()
    })
function verificar(task){
        const nodes=document.querySelectorAll(".parrafo")
        if(nodes.length>0){
            for (let i=0;nodes.length>0>i;i++){
                if (nodes[i].textContent==task) {
                    alert("Ya existe la tarea")
                    return false;
                }
            }
        }
}