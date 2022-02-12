import React, { Component, PropTypes } from 'react'
// import RichTextEditor from 'react-rte'

export class GeneratorMainBody extends Component {

  // static propTypes = {
  //   onchange: PropTypes.func
  // }

  // state = {
  //   value: RichTextEditor.createEmptyValue()
  // }

  // onChange = (value) => {
  //   this.setState({ value });
  //   if (this.props.onChange) {
  //     this.props.onChange(
  //       value.toString('html')
  //     )
  //   }
  // }

  headerTitleStyle = {
    fontWeight: 'bold',
    fontSize: '13.7018px',
    lineHeight: '120%',
    letterSpacing: '0.005em',
    color: '#000000',
    opacity: '0.8',
    marginBottom: '19.16px',
  }

  headerTitleStyle2 = {
    fontWeight: 'bold',
    fontSize: '15.4145px',
    lineHeight: '120%',
    letterSpacing: '0.005em',
    textTransform: 'capitalize',
    color: '#000000',
  }

  headerDetailsStyles = {
    fontWeight: 'bold',
    fontSize: '10.8108px',
    lineHeight: '120%',
    textAlign: 'right',
    letterSpacing: '0.005em',
    color: '#000000',
    opacity: '0.8',
    marginBottom: '19.16px',
  }

  headerDetailsValueStyles = {
    fontWeight: '500',
    fontSize: '10.8108px',
    lineHeight: '120%',
    textAlign: 'right',
    letterSpacing: '0.005em',
  }

  render() {
    const toolbarConfig = {

    }
    return (
      <div className=" mb-5 generator-container generator-main nb">
        <div className="relative">
          <div className="mb-4 flex justify-between generator-main-header">
            <div className="flex items-start">
              {/* icon */}
              <span className='mr-4'></span>
              <span className='ml-4 flex flex-col'>
                <span style={this.headerTitleStyle}>Keywords Name</span>
                <span style={this.headerTitleStyle2}>How to learn music </span>
              </span>
            </div>
            <div className="flex">
              <div className="flex flex-col mr-3">
                <span style={this.headerDetailsStyles}>Grammarly Score</span>
                <span className='text-primary' style={this.headerDetailsValueStyles}>96 percent ( % )</span>
              </div>
              <div className="flex flex-col mr-3">
                <span style={this.headerDetailsStyles}>Keywords Density</span>
                <span className='text-primary' style={this.headerDetailsValueStyles}>92 percent ( % )</span>
              </div>
              <div className="flex flex-col mr-3">
                <span style={this.headerDetailsStyles}>Words count</span>
                <span style={this.headerDetailsValueStyles}>160 Words</span>
              </div>
            </div>
          </div>
          <div className="generator-container" style={{ padding: '12px 56px 16px' }}>
            <div className='content'>
              I’ve always been way too interested in music theory. I was one of those students who wouldn’t accept a new musical concept or idea unless I knew exactly how it worked. This meant I got really good at music theory, and when I ended up studying music at university, I found the theory papers easy. I’d do a class test in 20 minutes knowing I’d aced it, and leave my classmates for another hour, drawing piano keyboards and charts on their test paper, struggling to finish in time. The advantage I had was that I could do it all in my head. I didn’t have to work out the answers to the questions by using a chart or drawing a piano keyboard on the page. I’d been doing music for over 10 years, and during that time I’d become familiar with the language to the point where I didn’t have to think about it. Aside from passing tests at uni.
              {/* <RichTextEditor
                value={this.state.value}
                onChange={this.onChange}
              /> */}
            </div>
          </div>
          <div className="absolute right-4 top-5">
            <div className="flex flex-col">
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default GeneratorMainBody