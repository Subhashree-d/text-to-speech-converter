document.addEventListener('DOMContentLoaded', function () {
    const textInput = document.getElementById('text-input');
    const voiceSelect = document.getElementById('voice-select');
    const volumeInput = document.getElementById('volume');
    const rateInput = document.getElementById('rate');
    const pitchInput = document.getElementById('pitch');
    const speakButton = document.getElementById('speak-button');
    const clearButton = document.getElementById('clear-button');

    let synth = window.speechSynthesis;
    let voices = [];

    function populateVoiceList() {
        voices = synth.getVoices();

        voices.forEach((voice) => {
            let option = document.createElement('option');
            option.textContent = `${voice.name} (${voice.lang})`;
            option.setAttribute('data-lang', voice.lang);
            option.setAttribute('data-name', voice.name);
            voiceSelect.appendChild(option);
        });
    }

    populateVoiceList();
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = populateVoiceList;
    }

    function speak() {
        if (synth.speaking) {
            console.error('SpeechSynthesis is already speaking');
            return;
        }
        if (textInput.value !== '') {
            let utterThis = new SpeechSynthesisUtterance(textInput.value);
            let selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
            voices.forEach((voice) => {
                if (voice.name === selectedOption) {
                    utterThis.voice = voice;
                }
            });
            utterThis.volume = volumeInput.value;
            utterThis.rate = rateInput.value;
            utterThis.pitch = pitchInput.value;

            utterThis.onend = () => {
                console.log('SpeechSynthesisUtterance.onend');
            };

            utterThis.onerror = (event) => {
                console.error('SpeechSynthesisUtterance.onerror', event);
            };

            synth.speak(utterThis);
        }
    }

    speakButton.addEventListener('click', speak);

    clearButton.addEventListener('click', () => {
        textInput.value = '';
    });
});
