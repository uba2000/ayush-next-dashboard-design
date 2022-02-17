import React, { Component, PropTypes } from 'react'
import { LanguageClarity } from '../../../ui/icons'
import { Pencil } from '../../../ui/icons/pencil'
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

  constructor(props) {
    super(props)

    this.state = {
      checked: false
    }
  }

  checkedHandler = (prevState) => {
    this.setState({
      checked: !prevState.checked
    })
  }

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
      <div className=" mb-5 generator-container md:px-8 px-4 generator-main nb">
        <div className="relative">
          <div className="mb-4 grid md:grid-cols-[37.31%_auto] grid-cols-1 gap-4 generator-main-header">
            <div className="flex items-start">
              {/* icon */}
              <span className='mr-4'>
                {!this.state.checked ? (
                  <span className="block cursor-pointer w-[19.74px] h-[20.55px] rounded border border-solid border-primary" onClick={this.checkedHandler}></span>
                ) : (
                  <span className="block cursor-pointer pop-in-animation" onClick={this.checkedHandler}>
                    <svg width="20" height="20" className='tick-svg' viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M7.49988 0.833984C5.51075 0.833984 3.6031 1.58026 2.19658 2.90864C0.790054 4.23703 -0.00012207 6.0387 -0.00012207 7.91732V22.084C-0.00012207 23.9626 0.790054 25.7643 2.19658 27.0927C3.6031 28.421 5.51075 29.1673 7.49988 29.1673H22.4999C24.489 29.1673 26.3967 28.421 27.8032 27.0927C29.2097 25.7643 29.9999 23.9626 29.9999 22.084V7.91732C29.9999 6.0387 29.2097 4.23703 27.8032 2.90864C26.3967 1.58026 24.489 0.833984 22.4999 0.833984H7.49988ZM20.5949 13.1363C20.7296 13.0005 20.8347 12.841 20.9042 12.6668C20.9736 12.4926 21.0061 12.3073 20.9997 12.1212C20.9932 11.9352 20.9481 11.7522 20.8668 11.5827C20.7855 11.4132 20.6697 11.2604 20.5259 11.1332C20.3821 11.0059 20.2132 10.9066 20.0287 10.8411C19.8443 10.7755 19.648 10.7448 19.4511 10.7509C19.2541 10.7569 19.0604 10.7995 18.8809 10.8763C18.7014 10.9531 18.5396 11.0625 18.4049 11.1983L13.7804 15.8592L11.4959 13.9424C11.1966 13.7074 10.8123 13.5915 10.4241 13.6191C10.036 13.6468 9.67445 13.8159 9.41586 14.0906C9.15727 14.3654 9.02189 14.7243 9.03831 15.0916C9.05474 15.4589 9.22168 15.8057 9.50388 16.0589L12.8789 18.8922C13.1709 19.1372 13.5526 19.265 13.9428 19.2483C14.333 19.2316 14.701 19.0719 14.9684 18.803L20.5934 13.1363H20.5949Z" fill="#00A141" />
                    </svg>
                  </span>
                )}
              </span>
              <span className='ml-4 flex flex-col'>
                <span style={this.headerTitleStyle}>Keywords Name</span>
                <span style={this.headerTitleStyle2}>How to learn music </span>
              </span>
            </div>
            <div className="flex ml-auto">
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
          <div className="relative generator-container md:px-[64.15px] px-4 pt-3 pb-4">
            <div className='content'>
              I’ve always been way too interested in music theory. I was one of those students who wouldn’t accept a new musical concept or idea unless I knew exactly how it worked. This meant I got really good at music theory, and when I ended up studying music at university, I found the theory papers easy. I’d do a class test in 20 minutes knowing I’d aced it, and leave my classmates for another hour, drawing piano keyboards and charts on their test paper, struggling to finish in time. The advantage I had was that I could do it all in my head. I didn’t have to work out the answers to the questions by using a chart or drawing a piano keyboard on the page. I’d been doing music for over 10 years, and during that time I’d become familiar with the language to the point where I didn’t have to think about it. Aside from passing tests at uni.
              {/* <RichTextEditor
                value={this.state.value}
                onChange={this.onChange}
              /> */}
            </div>
            <div className="absolute right-4 top-5">
              <div className="grid grid-rows-2 gap-3">
                <span>
                  <Pencil />
                </span>
                <span>
                  <LanguageClarity />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default GeneratorMainBody