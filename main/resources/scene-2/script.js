const Scene = (() => {
	const QuizQuestions = globalThis.QuizQuestions;

	class Quiz {
		questionsList = QuizQuestions;

		constructor(){
			this.node = this.createListNode(this.questionsList);
			this.hideAllQuestions();
			this.displayNextQuestion();
		}

		createListNode(questions){
			const node = document.createElement("ul");
			node.className = "quiz-list";

			questions
				.map(this.createQuestNode.bind(this))
				.forEach(question => node.append(question));

			return node;
		}

		createQuestNode(question){
			const questionManager = new Question(question);
			questionManager.emitter.once("option-click", () => this.displayNextQuestion());
			return questionManager.node;
		}

		displayNextQuestion(){
			const node = [...this.node.querySelectorAll(".question")]
				.find(node => node.classList.contains("hidden"));

			node?.classList.remove("hidden");
		}

		hideAllQuestions(){
			const nodes = [...this.node.querySelectorAll(".question")];
			for (const node of nodes){
				node.classList.add("hidden");
			}
		}
	}

	class Question {
		emitter = new EventEmitter();

		constructor(question){
			this.question = question;
			this.node = this.createContainerNode(question);
		}

		createContainerNode({title, description, options, reasoning}){
			const node = document.createElement("li");
			node.className = "question";
			
			node.innerHTML = `
				<h2>${ title }</h2>
				<p>${ description }</p>
				<section class = "question-options-list"></section>
				<section class = "question-reasoning" hidden><h2>Резюмируя</h2>${ reasoning }</section>
			`;

			const optionsListNode = node.querySelector(".question-options-list");

			options
				.map(this.createOptionNode.bind(this))
				.forEach(option => optionsListNode.append(option));


			return node;
		}

		createOptionNode({label, isCorrect}){
			const node = document.createElement("button");
			node.className = "question-option";

			node.setAttribute("data-isCorrect", isCorrect);

			node.onclick = this.handleOptionClick.bind(this, node);

			node.textContent = label;
			return node;
		}

		createReasoningNode(){
			const node = document.createElement("main");
			const reasoningContent = this.question.reasoning;
			node.innerHTML = `<h2>Резюмируя.</h2><p>${ reasoningContent }</p>`;
			return node;
		}

		handleOptionClick(node, clickEvent){
			this.emitter.emit("option-click", clickEvent);
			node.disabled = true;

			const content = node.textContent;
			const prefix = node.getAttribute("data-isCorrect") === "true" ?
				"Ответ верный — " : "Неверный ответ: ";

			node.textContent = `${ prefix }${ content }`;
			
			this.node.querySelector(".question-reasoning").hidden = false;
		}
	}

	const Scene = {
		Quiz,
		Question
	}
	return Scene;
})();

const node = new Scene.Quiz()
	.node;

document.querySelector(".quiz-container").append(node);

