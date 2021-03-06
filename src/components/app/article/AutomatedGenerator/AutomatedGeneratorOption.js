import React, { Component } from 'react'

export class AutomatedGeneratorOption extends Component {

  constructor(props) {
    super(props)
    this.state = {
      checked: false,
      load: false,
    }
  }

  clickOption = () => {
    if (!this.state.checked) {
      this.setState((prevState) => {
        return {
          load: true,
        }
      })
      setTimeout(() => {
        this.setState((prevState) => {
          return {
            load: false,
            checked: !prevState.checked
          }
        })
      })
    } else {
      this.setState((prevState) => {
        return {
          checked: !prevState.checked
        }
      })
    }
  }

  checkChange = (event) => {
    this.setState({
      checked: event.target.checked
    })
  }

  render() {
    const { title } = this.props;
    const { checked, load } = this.state;
    return (
      <div className="option-container relative bg-white hover:bg-primary cursor-pointer" onClick={this.clickOption}>
        <div className="option-select text-left">
          {/* TODO: Make option dragable */}
          <span className='text-[#DCD8E7] mr-[13.09px] cursor-grab'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-4 drag-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </span>
          <p className="mb-0 flex-grow flex-shrink line-clamp-1 select-none">
            {title}
          </p>
          <div className="ml-2 tick-container w-[19.17px] h-[19.17px]">
            {checked && <div className="pop-in-animation">
              <svg width="19.17" height="19.17" className='tick-svg' viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M7.49988 0.833984C5.51075 0.833984 3.6031 1.58026 2.19658 2.90864C0.790054 4.23703 -0.00012207 6.0387 -0.00012207 7.91732V22.084C-0.00012207 23.9626 0.790054 25.7643 2.19658 27.0927C3.6031 28.421 5.51075 29.1673 7.49988 29.1673H22.4999C24.489 29.1673 26.3967 28.421 27.8032 27.0927C29.2097 25.7643 29.9999 23.9626 29.9999 22.084V7.91732C29.9999 6.0387 29.2097 4.23703 27.8032 2.90864C26.3967 1.58026 24.489 0.833984 22.4999 0.833984H7.49988ZM20.5949 13.1363C20.7296 13.0005 20.8347 12.841 20.9042 12.6668C20.9736 12.4926 21.0061 12.3073 20.9997 12.1212C20.9932 11.9352 20.9481 11.7522 20.8668 11.5827C20.7855 11.4132 20.6697 11.2604 20.5259 11.1332C20.3821 11.0059 20.2132 10.9066 20.0287 10.8411C19.8443 10.7755 19.648 10.7448 19.4511 10.7509C19.2541 10.7569 19.0604 10.7995 18.8809 10.8763C18.7014 10.9531 18.5396 11.0625 18.4049 11.1983L13.7804 15.8592L11.4959 13.9424C11.1966 13.7074 10.8123 13.5915 10.4241 13.6191C10.036 13.6468 9.67445 13.8159 9.41586 14.0906C9.15727 14.3654 9.02189 14.7243 9.03831 15.0916C9.05474 15.4589 9.22168 15.8057 9.50388 16.0589L12.8789 18.8922C13.1709 19.1372 13.5526 19.265 13.9428 19.2483C14.333 19.2316 14.701 19.0719 14.9684 18.803L20.5934 13.1363H20.5949Z" fill="#00A141" />
              </svg>
            </div>}
            {load && <div className="pop-in-animation">
              <svg width="19.17" height="19.17" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.5" id="body" d="M7.5 2.24805C6.26387 2.24805 5.0555 2.6146 4.02769 3.30136C2.99988 3.98812 2.1988 4.96424 1.72576 6.10627C1.25271 7.24831 1.12894 8.50498 1.37009 9.71736C1.61125 10.9297 2.20651 12.0434 3.08059 12.9175C3.95466 13.7915 5.06831 14.3868 6.28069 14.628C7.49307 14.8691 8.74974 14.7453 9.89178 14.2723C11.0338 13.7992 12.0099 12.9982 12.6967 11.9704C13.3834 10.9426 13.75 9.73418 13.75 8.49805C13.75 7.67728 13.5883 6.86456 13.2743 6.10627C12.9602 5.34799 12.4998 4.659 11.9194 4.07863C11.3391 3.49826 10.6501 3.03789 9.89178 2.7238C9.13349 2.40971 8.32076 2.24805 7.5 2.24805ZM7.5 13.498C6.5111 13.498 5.5444 13.2048 4.72215 12.6554C3.89991 12.106 3.25904 11.3251 2.88061 10.4115C2.50217 9.49783 2.40315 8.4925 2.59608 7.52259C2.789 6.55269 3.26521 5.66178 3.96447 4.96251C4.66373 4.26325 5.55465 3.78705 6.52455 3.59412C7.49446 3.40119 8.49979 3.50021 9.41342 3.87865C10.3271 4.25709 11.1079 4.89795 11.6574 5.7202C12.2068 6.54244 12.5 7.50914 12.5 8.49805C12.5 9.82413 11.9732 11.0959 11.0355 12.0336C10.0979 12.9713 8.82609 13.498 7.5 13.498Z" fill="#00A141" />
                <path id="section" d="M12.5 8.49805H13.75C13.75 7.67729 13.5883 6.86456 13.2742 6.10628C12.9602 5.34799 12.4998 4.659 11.9194 4.07863C11.3391 3.49826 10.6501 3.03789 9.89177 2.7238C9.13349 2.40971 8.32076 2.24805 7.5 2.24805V3.49805C8.82608 3.49805 10.0979 4.02483 11.0355 4.96251C11.9732 5.90019 12.5 7.17196 12.5 8.49805Z" fill="#00A141" />
              </svg>
            </div>}
          </div>
        </div>
        <input type="checkbox" className="option-radio hidden" onChange={this.checkChange} checked={checked} />
      </div>
    )
  }
}

export default AutomatedGeneratorOption