import React, { Component } from 'react';
import axios from 'axios'

class CreateQuestion extends Component {
  state = {
    content: "",
    value: 0,
    subject: "",
    lesson: "",
    answers: {
      option_a: "",
      option_b: "",
      option_c: "",
      option_d: "",
    },
    rightAnswer: "",
    duration: 0,
    image: "",
    video: "",
    exam: "",
    type: ""
  }

  handleChange = (e) => {
    if (e.target.name.includes("option")) {
      const updatedAnswers = {
        ...this.state.answers
      }
      updatedAnswers[e.target.name] = e.target.value
      this.setState({ answers: updatedAnswers });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
    console.log(this.state)
  }

  onSubmit = (e) => {
    e.preventDefault();

    const question = {
      content: this.state.content,
      value: this.state.value,
      subject: this.state.subject,
      lesson: this.state.lesson,
      answers: {
        A: this.state.answers.option_a,
        B: this.state.answers.option_b,
        C: this.state.answers.option_c,
        D: this.state.answers.option_d,
      },
      rightAnswer: this.state.rightAnswer,
      duration: this.state.duration,
      image: this.state.image,
      video: this.state.video,
      exam: this.state.exam,
      type: this.state.type
    }

    console.log(question)

    axios.post('/api/questions/add', question)
      .then(res => console.log(res.data))
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.onSubmit}>
          <label>Content: </label>
          <input type="text" name="content" onChange={this.handleChange}></input>
          <label>Value: </label>
          <input type="number" name="value" onChange={this.handleChange}></input>
          <label>Subject: </label>
          <input type="text" name="subject" onChange={this.handleChange}></input>
          <label>Lesson: </label>
          <input type="text" name="lesson" onChange={this.handleChange}></input>
          <label>Answers: </label>
          <input type="text" name="option_a" onChange={this.handleChange}></input>
          <input type="text" name="option_b" onChange={this.handleChange}></input>
          <input type="text" name="option_c" onChange={this.handleChange}></input>
          <input type="text" name="option_d" onChange={this.handleChange}></input>
          <label>Right Answer: </label>
          <input type="text" name="rightAnswer" onChange={this.handleChange}></input>
          <label>Duration: </label>
          <input type="number" name="duration" onChange={this.handleChange}></input>
          <label>Image: </label>
          <input type="text" name="image" onChange={this.handleChange}></input>
          <label>Video: </label>
          <input type="text" name="video" onChange={this.handleChange}></input>
          <label>Exam: </label>
          <input type="text" name="exam" onChange={this.handleChange}></input>
          <label>Type: </label>
          <input type="text" name="type" onChange={this.handleChange}></input>
          <input type="submit" className="btn btn-primary" value="Create Question"></input>
        </form>
      </div>
    );
  }
}

export default CreateQuestion;