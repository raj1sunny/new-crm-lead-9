var chatbotHtml = `
    <style>
        #getInTouchButton {
            position: absolute;
            right: 0;
            bottom: 0;
            margin: 0px 10px 5px 0px;
            display: block;
            width: 200px;
            height: 30px;
            background-color: lightskyblue;
            color: black;
            border: 0;
            border-radius: 10px;
        }

        .crm-modal {
            display: none;
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgb(0, 0, 0);
            background-color: rgba(0, 0, 0, 0.4);
        }

        .crm-modal-content {
            background-color: #fefefe;
            margin: 15% auto;
            padding: 20px;
            border: 1px solid #888;
            width: 80%;
        }

        .close {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
        }

        .close:hover,
        .close:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
        }
    </style>

        <meta charset='utf-8'>
        <meta http-equiv='X-UA-Compatible' content='IE=edge'>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>

        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js"
        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
        crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js"
        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
        crossorigin="anonymous"></script>

        <div id="getInTouchOpenModal" class="crm-modal">
        <div class="crm-modal-content">
            <span class="close">&times;</span>
            <div class="card">
            <div class=card-body>
                <div id="container"> </div>
        </div>
        <div class="d-grid gap-2 col-6 mx-auto mb-2">
        <button type="submit" class="btn btn-primary" id="submit" onclick="saveLeadForm()">Save</button>
        </div>
        </div>
    </div>
  </div>
 <button type="button" id="getInTouchButton" onclick="openModal()">Get In Touch</button>
`

var bodyHTML = document.body.innerHTML
bodyHTML = bodyHTML + chatbotHtml
document.body.innerHTML = bodyHTML

const modal = document.getElementById('getInTouchOpenModal');
const close = document.getElementsByClassName("close")[0];

close.addEventListener('click', () => {
    modal.style.display = 'none';
})

function openModal() {
      modal.style.display = 'block';  
}


async function getTemplate(templateId,moduleID) {
    if(templateId){
        let response = await fetch(`https://api.wolfeocrm.com/v1/setting/${moduleID.moduleId}/form-template/${templateId.formId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJMVENCV1M4RkRVTkdTMDNUIiwiaXNzIjoiaHR0cHM6Ly9hcGkuaWxvZ2dlcnouY29tL2FwaS92MS9sb2dpbiIsImlhdCI6MTY3Nzg1NDU1NCwiZXhwIjoxNjc3ODU4MTU0LCJuYmYiOjE2Nzc4NTQ1NTQsImp0aSI6IkxUQ0JXUzhGRFVOR1MwM1QxNjc3ODU0NTU0In0.o2ZeNL1leUSPndMK7_CuuYz_7sVjnqUZtL1Sg9Lyx54'
            }
        }).then(async (res) => {
            data = await res.json();
        })
            .catch((err) => {
                console.log('err===', err)
            })
    }

    allData = data.attributes.data.sections;

    var container = document.getElementById("container");

    for (var i = 0; i < allData.length; i++) {

        for (var j = 0; j < data.attributes.data[allData[i]].fields.length; j++) {

            if (data.attributes.data[allData[i]].fields[j] == data.attributes.data[allData[i]][data.attributes.data[allData[i]].fields[j]].fieldName) {

                var paragraph = document.createElement("p");
                var input = document.createElement("input");
                var selectList = document.createElement("select");


                paragraph.style.margin = "0px 0px 5px 0px";
                input.style.margin = "0px 0px 10px 0px";
                selectList.style.margin = "0px 0px 10px 0px";

                paragraph.textContent = data.attributes.data[allData[i]][data.attributes.data[allData[i]].fields[j]].labelName;

                if (data.attributes.data[allData[i]][data.attributes.data[allData[i]].fields[j]].dataType == "picklist") {

                    var array = data.attributes.data[allData[i]][data.attributes.data[allData[i]].fields[j]].pickListValues;

                    for (var k = 0; k < array.length; k++) {
                        var option = document.createElement("option");
                        option.value = array[k].id;
                        option.text = array[k].name;
                        selectList.appendChild(option);
                    }

                    selectList.className = data.attributes.data[allData[i]][data.attributes.data[allData[i]].fields[j]].class;
                    selectList.name = data.attributes.data[allData[i]][data.attributes.data[allData[i]].fields[j]].fieldName;
                    selectList.value = data.attributes.data[allData[i]][data.attributes.data[allData[i]].fields[j]].value;
                    container.appendChild(paragraph);
                    container.appendChild(selectList);

                }
                else if (data.attributes.data[allData[i]][data.attributes.data[allData[i]].fields[j]].dataType == "text") {
                    input.type = data.attributes.data[allData[i]][data.attributes.data[allData[i]].fields[j]].dataType;
                    input.className = data.attributes.data[allData[i]][data.attributes.data[allData[i]].fields[j]].class;
                    input.placeholder = data.attributes.data[allData[i]][data.attributes.data[allData[i]].fields[j]].placeholder;
                    input.name = data.attributes.data[allData[i]][data.attributes.data[allData[i]].fields[j]].fieldName;
                    input.value = data.attributes.data[allData[i]][data.attributes.data[allData[i]].fields[i]].value;

                    container.appendChild(paragraph);
                    container.appendChild(input);
                } else if (data.attributes.data[allData[i]][data.attributes.data[allData[i]].fields[j]].dataType == "file") {
                    input.type = data.attributes.data[allData[i]][data.attributes.data[allData[i]].fields[j]].dataType;
                    input.className = data.attributes.data[allData[i]][data.attributes.data[allData[i]].fields[j]].class;
                    input.placeholder = data.attributes.data[allData[i]][data.attributes.data[allData[i]].fields[j]].placeholder;
                    input.name = data.attributes.data[allData[i]][data.attributes.data[allData[i]].fields[j]].dataType;
                    input.value = data.attributes.data[allData[i]][data.attributes.data[allData[i]].fields[i]].value;

                    container.appendChild(paragraph);
                    container.appendChild(input);
                }
                else if (data.attributes.data[allData[i]][data.attributes.data[allData[i]].fields[j]].dataType == "radio") {

                    var radioArray = data.attributes.data[allData[i]][data.attributes.data[allData[i]].fields[j]].radioOptions;
                    container.appendChild(paragraph);
                    for (var m = 0; m < radioArray.length; m++) {

                        const option = radioArray[m];
                        var input = document.createElement("input");
                        var label = document.createElement("label");
                        label.setAttribute("for", `option-${i}`);
                        label.textContent = option;

                        input.type = data.attributes.data[allData[i]][data.attributes.data[allData[i]].fields[j]].dataType;
                        input.className = data.attributes.data[allData[i]][data.attributes.data[allData[i]].fields[j]].class;
                        input.name = "myRadioGroup";
                        input.value = option;

                        input.style.margin = "5px"

                        container.appendChild(input);
                        container.appendChild(label);

                    }
                }
                else {
                    input.type = data.attributes.data[allData[i]][data.attributes.data[allData[i]].fields[j]].dataType;
                    input.className = data.attributes.data[allData[i]][data.attributes.data[allData[i]].fields[j]].class;
                    input.placeholder = data.attributes.data[allData[i]][data.attributes.data[allData[i]].fields[j]].placeholder;
                    input.name = data.attributes.data[allData[i]][data.attributes.data[allData[i]].fields[j]].fieldName;
                    input.value = data.attributes.data[allData[i]][data.attributes.data[allData[i]].fields[i]].value;

                    container.appendChild(paragraph);
                    container.appendChild(input);
                }
            }
        }
    }
}
