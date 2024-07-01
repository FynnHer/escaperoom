document.addEventListener('DOMContentLoaded', () => {
    const controller = new ScrollMagic.Controller();
    new ScrollMagic.Scene({
        triggerElement: '#puzzles-section',
        triggerHook: 0.9
    })
    .setClassToggle('#puzzles-section', 'visible')
    .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: '#mappings-section',
        triggerHook: 0.9
    })
    .setClassToggle('#mappings-section', 'visible')
    .addTo(controller);

    loadPuzzles();
    loadMappings();

    document.getElementById('logout').addEventListener('click', (event) => {
        event.preventDefault();
        fetch('private/logout.php', {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = 'login.php';
            } else {
                console.error('Logout failed');
            }
        })
        .catch(error => {
            console.error('Error during logout:', error);
        });
    });

    document.getElementById('nav-puzzles').addEventListener('click', () => {
        document.getElementById('puzzles-section').classList.remove('hidden');
        document.getElementById('mappings-section').classList.add('hidden');
        document.getElementById('camera-section').classList.add('hidden');
    });

    document.getElementById('nav-mappings').addEventListener('click', () => {
        document.getElementById('puzzles-section').classList.add('hidden');
        document.getElementById('mappings-section').classList.remove('hidden');
        document.getElementById('camera-section').classList.add('hidden');
    });
    document.getElementById('nav-camera').addEventListener('click', () => {
        document.getElementById('puzzles-section').classList.add('hidden');
        document.getElementById('mappings-section').classList.add('hidden');
        document.getElementById('camera-section').classList.remove('hidden');
    });

    document.getElementById('add-mapping').addEventListener('click', () => {
        const newMapping = {
            outputs: [],
            inputs: []
        };
        addMapping(newMapping);
    });

    function loadPuzzles() {
        fetch('puzzles.json')
            .then(response => response.json())
            .then(data => {
                const puzzleList = document.getElementById('puzzle-list');
                puzzleList.innerHTML = '';
                data.forEach(puzzle => {
                    const puzzleElement = document.createElement('div');
                    puzzleElement.classList.add('puzzle');

                    const puzzleTitle = document.createElement('h3');
                    const statusCircle = document.createElement('div');
                    statusCircle.classList.add('circle');
                    statusCircle.style.backgroundColor = puzzle.isOnline ? 'green' : 'red';
                    puzzleTitle.appendChild(statusCircle);
                    puzzleTitle.appendChild(document.createTextNode(`${puzzle.name} (${puzzle.ip || 'keine IP'})`));
                    puzzleElement.appendChild(puzzleTitle);

                    const inputs = document.createElement('div');
                    inputs.classList.add('input-output');
                    const inputsTitle = document.createElement('h4');
                    inputsTitle.textContent = 'Inputs';
                    inputs.appendChild(inputsTitle);

                    puzzle.inputs.forEach(input => {
                        const inputElement = document.createElement('div');
                        inputElement.textContent = `${input.name} (${input.type}): ${input.lastTriggerValue}`;
                        inputs.appendChild(inputElement);
                    });
                    puzzleElement.appendChild(inputs);

                    const outputs = document.createElement('div');
                    outputs.classList.add('input-output');
                    const outputsTitle = document.createElement('h4');
                    outputsTitle.textContent = 'Outputs';
                    outputs.appendChild(outputsTitle);

                    puzzle.outputs.forEach(output => {
                        const outputElement = document.createElement('div');
                        outputElement.textContent = `${output.name} (${output.type}): ${output.value}`;
                        outputs.appendChild(outputElement);
                    });
                    puzzleElement.appendChild(outputs);

                    puzzleList.appendChild(puzzleElement);
                });
            })
            .catch(error => {
                console.error('Error loading puzzles:', error);
            });
    }

    function loadMappings() {
        fetch('mappings.json')
            .then(response => response.json())
            .then(data => {
                const mappingList = document.getElementById('mapping-list');
                mappingList.innerHTML = '';
                data.forEach((mapping, index) => {
                    const mappingElement = document.createElement('div');
                    mappingElement.classList.add('mapping');
                    const outputsElement = document.createElement('div');
                    outputsElement.classList.add('mapping-outputs');
                    const outputsTitle = document.createElement('h4');
                    outputsTitle.textContent = `Outputs (${index + 1})`;
                    outputsElement.appendChild(outputsTitle);

                    mapping.outputs.forEach(output => {
                        const outputElement = document.createElement('div');
                        outputElement.textContent = `${output.puzzle} - ${output.name} (${output.match.type}: ${output.match.value})`;
                        outputsElement.appendChild(outputElement);
                    });

                    const inputsElement = document.createElement('div');
                    inputsElement.classList.add('mapping-inputs');
                    const inputsTitle = document.createElement('h4');
                    inputsTitle.textContent = 'Inputs';
                    inputsElement.appendChild(inputsTitle);

                    mapping.inputs.forEach(input => {
                        const inputElement = document.createElement('div');
                        inputElement.textContent = `${input.puzzle} - ${input.name} (${input.send.type})`;
                        inputsElement.appendChild(inputElement);
                    });

                    const addOutputButton = document.createElement('button');
                    addOutputButton.textContent = 'Output hinzufügen';
                    addOutputButton.addEventListener('click', () => {
                        const outputName = prompt('Output Name:');
                        const outputPuzzle = prompt('Output Puzzle:');
                        const outputMatchType = prompt('Output Match Type:');
                        const outputMatchValue = prompt('Output Match Value:');
                        if (outputName && outputPuzzle && outputMatchType && outputMatchValue) {
                            mapping.outputs.push({
                                name: outputName,
                                puzzle: outputPuzzle,
                                match: {
                                    type: outputMatchType,
                                    value: outputMatchValue
                                }
                            });
                            saveMappings(data);
                        }
                    });

                    const addInputButton = document.createElement('button');
                    addInputButton.textContent = 'Input hinzufügen';
                    addInputButton.addEventListener('click', () => {
                        const inputName = prompt('Input Name:');
                        const inputPuzzle = prompt('Input Puzzle:');
                        const inputSendType = prompt('Input Send Type:');
                        if (inputName && inputPuzzle && inputSendType) {
                            mapping.inputs.push({
                                name: inputName,
                                puzzle: inputPuzzle,
                                send: {
                                    type: inputSendType
                                }
                            });
                            saveMappings(data);
                        }
                    });

                    mappingElement.appendChild(outputsElement);
                    mappingElement.appendChild(inputsElement);
                    mappingElement.appendChild(addOutputButton);
                    mappingElement.appendChild(addInputButton);
                    mappingList.appendChild(mappingElement);
                });
            })
            .catch(error => {
                console.error('Error loading mappings:', error);
            });
    }

    function addMapping(newMapping) {
        fetch('mappings.json')
            .then(response => response.json())
            .then(data => {
                data.push(newMapping);
                return saveMappings(data);
            })
            .catch(error => {
                console.error('Error adding mapping:', error);
            });
    }

    function saveMappings(data) {
        return fetch('private/update_mappings.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(() => loadMappings())
        .catch(error => {
            console.error('Error saving mappings:', error);
        });
    }
});
