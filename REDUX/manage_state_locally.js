class DisplayMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      messages: [],
    };
  }
  // add handleChange() and submitMessage() methods here
  handleChange(event) {
    // hnadle events pass them and do stuff
    this.setState({
      input: event.target.value,
      messages: this.state.messages,
    });
  }

  submitMessage() {
    this.setState({
      input: '',
      //   spread the array and add
      messages: [...this.state.messages, this.state.input],
    });
  }

  render() {
    return (
      <div>
        <h2>Type in a new Message:</h2>
        {/* render an input, button, and ul here */}
        <input
          // dont forget to bind when no ES6
          onChange={this.handleChange.bind(this)}
          value={this.state.input}
        />
        <button onClick={this.submitMessage.bind(this)}>Submit</button>
        <ul>
          {this.state.messages.map((x, i) => {
            //   remember to add keys to li (a react thing)
            return <li key={i}>{x}</li>;
          })}
        </ul>
        {/* change code above this line */}
      </div>
    );
  }
}
