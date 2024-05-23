import React,{useEffect} from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
  
    Flex,
    Box,
    Text,
    Center,
    FormControl,
    FormLabel,
    Spinner,
    Divider,
    FormHelperText,
    Input,
    InputGroup,
    InputRightElement,
    FormErrorMessage,
    Image,
    ChakraProvider,
    extendTheme,
    useToast
  } from '@chakra-ui/react'
  import {useState} from 'react'
  import ArrowLeft from "../../assets/images/login/arrow-left.png";
  import BG from "../../assets/images/login/bg.png";
  import Global from "../../assets/images/login/global.png";
  import Tw from "../../assets/images/login/tw.png";
  import Matemask from "../../assets/images/login/matemask.png";
  import welletConnect from "../../assets/images/login/welletconnect.png";
  import arrowRight from '../../assets/images/login/arrow-right.png'
  import eye from '../../assets/images/login/eye.png'
  import closeImg from '../../assets/images/login/close-img.png'
  import eyeOpen from '../../assets/images/login/eye-open.png'
  import LoadingImg from '../../assets/images/login/loding.gif'
  import pawRadio from '../../assets/images/login/pawRadio.png'
  import pawActiveRadio from '../../assets/images/login/pawActiveRadio.png'
  import arrowActiveRight from '../../assets/images/login/arrow-right-active.png'
   import { getUserExists,registerByEmail, sendSecurityCode,postLoginByEmail,postForgetPassword,postCheckSecurityCode,postSocialAccount,postUserExists,postSocialAccountLogin}  from '../../api/login'
   import { useSelector, useDispatch } from 'react-redux';
   import { updateLogin,updateToken,updateEmail } from '../../stores/userSlice'
   import { getAuth, signInWithPopup, GoogleAuthProvider ,TwitterAuthProvider,onAuthStateChanged,getRedirectResult} from "firebase/auth";
   import { initializeApp } from 'firebase/app';
  //  import firebase from 'firebase/app';
   import { GetQueryString,obfuscateEmail } from '../../utils/tool'
   import 'firebase/auth';
   import { getAnalytics } from "firebase/analytics";
  //  import { getFirestore } from "firebase/firestore";
  import './index.css';
import { url } from 'inspector';


  interface LoginProps {
    visible:boolean, 
    onClick: (type:any,login:any) => void;
   }
  const Login:React.FC<LoginProps>  = ({visible,onClick}) => {
    
    const localParams = GetQueryString('invitationCode')
    // console.log(localParams,'localParams==>')
    const toast = useToast()
    const { isOpen, onOpen } = useDisclosure()
    const [open,setOpen] = useState(visible)
    const [loading,setLoading] = useState(false)
    const [isError,setIsError] = useState(false)
    const [isEmailError,setIsEmailError] = useState(false)
    const [isPassError,setIsPassError] = useState(false) 
    const [isSameError,setIsSameError] = useState(false)
    const [isVerifyError,isSetVerifyError] = useState(false)
    const [isHandelArrow,setIsHandelArrow] = useState(false)
    const [input, setInput] = useState('')
    const [emailValue,setEmailValue] = useState('')
    const [passwordValue,setPassword] = useState('')
    const [resetOriginValue,setResetOriginValue] =  useState('')
    const [createdPwdValue,setCreatedPwdValue] = useState('')
    const [isNextActiveCreated,setIsNextActiveCreated] = useState(false)
    const [emailText,setEmailText] = useState('Invalid email address.')
    const [modelType,setModelType] = useState('register')
    const [show, setShow] = React.useState(false)
    const [seconedShow, setSeconedShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    const handleSeconedClick= () => setSeconedShow(!seconedShow)
    const [isCounting, setIsCounting] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [referralCode,setReferralCode] = useState('')
    const [verifyValue,setVerifyValue] = useState('')
    const [isSameFirstError,setIsSameFirstError] = useState(false);
    const [submitLoading,setSubmitLoading] = useState(false)
    const {  email,userEmail } = useSelector((state:any) => state.user);
    const dispatch = useDispatch();
    const firebaseConfig = {
      apiKey: "AIzaSyCDgIED8vDNIn7l6_pOPcjeCu-jFOe_wgo",
      authDomain: "fir-auth-89508.firebaseapp.com",
      projectId: "fir-auth-89508",
      storageBucket: "fir-auth-89508.appspot.com",
      messagingSenderId: "907675668530",
      appId: "1:907675668530:web:622cb50ee6638286b02c2b",
      measurementId: "G-85GLZ42WL7"
    };
  
      const app = initializeApp(firebaseConfig);
      const analytics = getAnalytics(app);
  
      const auth = getAuth(app);
      
   
      const twitterHandel = async () => {
        const provider = new TwitterAuthProvider();
        try{
       
          const userResult:any = await signInWithPopup(auth, provider)
          console.log(userResult,'TwitterAuthProvider==>userResult')
          console.log(userResult,'userResult')
          setOpen(false)
          const checkParams = {
            accountType:2,
            openId:userResult.user.uid,
          }
          const  result:any = await postUserExists(checkParams)
          console.log(result,'result')
         
          if(result?.data?.status===1){
            const params = {
              accountType:2,
              openId:userResult.user.uid,
              accessToken:userResult?.user?.accessToken,
            }
            const {data} = await postSocialAccountLogin(params)
            console.log(data)
          
            dispatch(updateLogin(true))
            dispatch(updateToken(data?.token))
            dispatch(updateEmail(userResult.user.providerData[0].email))
            sessionStorage.setItem('login','true')
            sessionStorage.setItem('token',data?.token)
            sessionStorage.setItem('email',userResult.user.providerData[0].email)
           
            toast({
              title: 'Login successful！',
              status: 'success',
              position: "top",
              duration: 5000,
            })
          }else{
            const params = {
              email:userResult.user.providerData[0].email,
              openId:userResult.user.uid,
              accountType:2,
              accessToken:userResult?.user?.accessToken,
              source:1,
              invitedCode:localParams
            }
              const { data } = await postSocialAccount(params)
              console.log(data)
              dispatch(updateLogin(true))
              dispatch(updateToken(data?.token))
              dispatch(updateEmail(userResult.user.providerData[0].email))
              sessionStorage.setItem('login','true')
              sessionStorage.setItem('token',data?.token)
              sessionStorage.setItem('email',userResult.user.providerData[0].email)
              setOpen(false)
              toast({
                title: 'registered successfully!',
                status: 'success',
                position: "top",
                duration: 5000,
              })
          }
        }catch(error){
           
              console.error('Error initializing Firebase:', error);
           
        }
      }
  
    const googleHandel = async () =>{
    // Initialize Firebase
    
      const googleProvider = new GoogleAuthProvider();
      console.log(googleProvider,'googleProvider==>')
    
      try{
       
        const userResult:any = await signInWithPopup(auth, googleProvider)
        console.log(userResult,'userResult')
        setOpen(false)
        const checkParams = {
          accountType:1,
          openId:userResult.user.uid,
        }
        const  result:any = await postUserExists(checkParams)
        console.log(result,'result')
       
        if(result?.data?.status===1){
          const params = {
            accountType:1,
            openId:userResult.user.uid,
            accessToken:userResult?.user?.accessToken,
          }
          const {data} = await postSocialAccountLogin(params)
          console.log(data)
        
          dispatch(updateLogin(true))
          dispatch(updateToken(data?.token))
          dispatch(updateEmail(userResult.user.providerData[0].email))
          sessionStorage.setItem('login','true')
          sessionStorage.setItem('token',data?.token)
          sessionStorage.setItem('email',userResult.user.providerData[0].email)
         
          toast({
            title: 'Login successful！',
            status: 'success',
            position: "top",
            duration: 5000,
          })
        }else{
          const params = {
            email:userResult.user.providerData[0].email,
            openId:userResult.user.uid,
            accountType:1,
            accessToken:userResult?.user?.accessToken,
            source:1,
            invitedCode:localParams
          }
              const { data } = await postSocialAccount(params)
              console.log(data)
              dispatch(updateLogin(true))
              dispatch(updateToken(data?.token))
              dispatch(updateEmail(userResult.user.providerData[0].email))
              sessionStorage.setItem('login','true')
              sessionStorage.setItem('token',data?.token)
              sessionStorage.setItem('email',userResult.user.providerData[0].email)
              setOpen(false)
              toast({
                title: 'registered successfully!',
                status: 'success',
                position: "top",
                duration: 5000,
              })
        }
     
      }catch(error){
         
            console.error('Error initializing Firebase:', error);
         
      }
      
    // // 触发谷歌登录弹出窗口
      // signInWithPopup(auth, googleProvider)
      //   .then((result) => {
      //     // 登录成功,获取用户信息
      //     const user = result.user;
      //     console.log('Signed in user:', user);
      //   })
      //   .catch((error) => {
      //     // 处理登录错误
      //     if (error.code === 'auth/permission-denied') {
      //       console.error('Firebase API key has been suspended. Please contact Firebase support.');
      //     } else {
      //       console.error('Error initializing Firebase:', error);
      //     }
      //   });
    }
   
    /**
     * 创建账户的操作
     **/
    // 邮箱输入事件
    const handleEmailChange = (e:any) => {
      console.log(e.target.value,'e.target.value==>')
      setEmailValue(e.target.value)
      const lenBoolean = e.target.value.length>0?true:false
      setIsHandelArrow(lenBoolean)
      setIsEmailError(false)
   }
   // 查询邮箱是否创建
   const createdHandel = async () => {
    
    const reg = /^[\w\-_.]+@[0-9a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
    setLoading(true)
    if(!reg.test(emailValue)){
      setIsEmailError(true)
      setLoading(false)
      setIsHandelArrow(false)
      setEmailText('Invalid email address.')
      return;
    }
    let {data}  = await getUserExists(emailValue)
    console.log(data,'data===>a')
   
  
    if(!isHandelArrow) return
    dispatch(updateEmail(emailValue))
    sessionStorage.setItem('email',emailValue)
    setTimeout(()=>{
      console.log(reg.test(emailValue),'===>email')
   
    
        let state = data?.status||1
        const textError = state === 1? 'Invalid email address.':'3Dizer account not found.'
       
        if(state === 2){
          setEmailText(textError)
          setIsEmailError(true)
          setLoading(false)
          return;
        }else{
          setIsEmailError(false)
          setLoading(false)
          setModelType('login')
        }
      
     
    },1500)
   
     
      
    

   
    }
    // created 账户页面
    const createdClick = () => {
      setModelType('created')
    }
    /**
     *  @type created
     *  @Event 密码事件
      **/ 
    const createdPwdChange = async (e:any) => {
      const passwordReg = /^(?=.*[A-Z])(?=.*\d).{8,}$/
      setCreatedPwdValue(e.target.value)
      if(!passwordReg.test(e.target.value)){
        setIsNextActiveCreated(false)
        return;
      };
      
      setIsNextActiveCreated(true)
     

   }
    // created next 事件
    const createdNextHandle = () => {
      if(!isNextActiveCreated) return;
      setModelType('verify')
    }

   
    

    /**
     *  @type login
     *  @Event sign 事件
     * 
     **/
    const signHandle = async () => {
      const params = {
        email:emailValue,
        password:passwordValue
      }
      if(submitLoading){
        return;
      }
      setIsPassError(false)
      setSubmitLoading(true)
      const { data ,code} = await postLoginByEmail(params)
      console.log(data)
      setSubmitLoading(false)
      if(!code){
        toast({
          title: 'Login successful！',
          status: 'success',
          position: "top",
          duration: 5000,
        })
        setIsPassError(false)
      
        sessionStorage.setItem('login','true')
        if(Object.keys(data).length>0 && data.token){
          sessionStorage.setItem('token',data.token)
        }
       
        onClick(false,true)
        setOpen(false)
        setModelType('register')
        setPassword('')
        dispatch(updateLogin(true))
        dispatch(updateToken(data?.token))
        setEmailValue('')
        return;
      }
      if(code>0){
        setIsPassError(true)
      }
     
    }
    const submitHandle = async () => {
      const params = {
        email:emailValue,
        securityCode:input,
        type:2
      }
      const { data,code } = await postCheckSecurityCode(params)
      console.log(data)
      if(code>0){
        isSetVerifyError(true)
        return;
      }
      if(data && !data?.check){
        isSetVerifyError(true)
      }else{
        isSetVerifyError(false)
        setIsSameError(false)
        setIsSameFirstError(false)
        setPassword('')
        setResetOriginValue('')
        setModelType('reset')
      }
    }
    const handleResetChange = (e:any) => {
      setResetOriginValue(e.target.value)
    }
    const handleReferralChange = (e:any) => {
      setReferralCode(e.target.value)
    }
    const handleVerifyChange = (e:any) => {
      setVerifyValue(e.target.value)
      if(!e.target.value.length){
        isSetVerifyError(false)
      }
    }
    // 二次确认密码
    const confirmPwdHandle = async () => {
      if(!resetOriginValue){
        setIsSameFirstError(true)
        return
      }else{
        setIsSameFirstError(false)
      }
      if(passwordValue !== resetOriginValue){
        setIsSameError(true)
        return
      }
      const params = {
        email:emailValue,
        password:passwordValue,
        securityCode:input
      }
      setIsSameError(false)
      const { data ,code} = await postForgetPassword(params)
      console.log(data)
     
      // 
      if(code===0){
        toast({
          title: 'Your password has been successfully changed.',
          status: 'success',
          position: "top",
          duration: 5000,
        })
        const LoginParams = {
          email:emailValue,
          password:passwordValue
        }
        const loginData  = await postLoginByEmail(LoginParams)
        console.log(loginData,'loginData++>')
        dispatch(updateLogin(true))
        dispatch(updateToken(loginData?.data?.token))
        sessionStorage.setItem('login','true')
        sessionStorage.setItem('token',loginData.data?.token)
        setIsSameFirstError(false)
        setIsSameError(false)
        setOpen(false) 
        setPassword('')
        setEmailValue('')
        setModelType('register')
        return
      }
      if(code>0){
        toast({
          title: 'Server exception!',
          status: 'error',
          position: "top",
          duration: 5000,
        })
      }
      
    }
 // localParams
 const createdAxios = async () => {
    const params = {
      email:emailValue,
      password:createdPwdValue,
      source:'1',
      securityCode:verifyValue,
      invitedCode:localParams?localParams:referralCode
    }
    if(submitLoading){
      return;
    }
    setSubmitLoading(true)
    const { data,code,msg } = await registerByEmail(params)
    setSubmitLoading(false)
    if(!code){
      toast({
        title: 'registered successfully!',
        status: 'success',
        position: "top",
        duration: 5000,
      
      })
      dispatch(updateLogin(true))
      dispatch(updateToken(data?.token))
      sessionStorage.setItem('token',data?.token)
      sessionStorage.setItem('login','true')
      setOpen(false)
      setModelType('register')
      setEmailValue('')
    
      return
    };
    console.log(code,msg)
    toast({
      title: msg,
      status: 'error',
      position: "top",
      duration: 3000,
    }) 
    setOpen(false)
  }
   /**
     *  @type verify
     *  @event next事件
     * 
     **/
   const verifyHandle = async () => {
    const params = {
      email:emailValue,
      securityCode:verifyValue,
      type:1
    }
    const { data } = await postCheckSecurityCode(params)
    console.log(data)
    if(data && !data?.check){
      isSetVerifyError(true)
    }else{
      if(localParams){
        isSetVerifyError(false)
        createdAxios()
      }else{
        isSetVerifyError(false)
        setModelType('referral')
      }
     
    }
    // setModelType('referral')
   
  }
    /**
     *  @type referral
     *  @Event next 事件
     * 
     **/
    const referralHandle = async () => {
      createdAxios()
    }
   
    const handleInputChange = (e:any) => {
        console.log(e.target.value,'e.target.value==>')
        setInput(e.target.value)
        // const lenBoolean = e.target.value.length>0?true:false
        // setIsHandelArrow(lenBoolean)
       
     }

     const handlePwdChange = (e:any) => {
     
        setPassword(e.target.value)
     }
   
    const onClose = () => {
      setModelType('register')
      setSubmitLoading(false)
      onClick(false,false)
      setIsEmailError(false)
      setOpen(false)
      setInput('')
      setVerifyValue('')
    }
    
    const closeImgHandel = () => {
      setEmailValue('')
      setIsEmailError(false)
      setLoading(false)
      setIsHandelArrow(false)
    }
    useEffect(() => {
      let timer:any = null;

      if (isCounting) {
        timer = setTimeout(() => {
          setCountdown(countdown - 1);
        }, 1000);
      }

      if (countdown === 0) {
        setIsCounting(false);
      }

      return () => {
        clearTimeout(timer);
      };
    }, [countdown, isCounting]);
    // 发送验证码
    const handleSendClick = async (type:number)=>{
      if (!isCounting) {
        // 处理发送验证码的逻辑
        // 在这里可以调用发送验证码的函数等
        // ...
  
        // 设置倒计时为60秒
       
        setCountdown(60);
        setIsCounting(true);
        const { data,code } = await sendSecurityCode({email:emailValue,type:type})
        console.log(data,'data==>')
        if(code>0){
          setIsCounting(false);
        }
      }
    }
    // 忘记密码
    const forgotHandle = () => {
      setModelType('seVerify')
    }
    // 返回
    const backHandle = () => {
      const backParams:any = {
        'created':'register',
        'verify':'created',
        'referral':'verify',
        'login':'register',
        'seVerify':'login',
        'reset':'seVerify'
      }
      setModelType(backParams[modelType])
      setPassword('')
      setResetOriginValue('')
      setVerifyValue('')
      setIsSameError(false)

    }
    const comingHandle = () =>{
      toast({
        title: 'Coming Soon!',
        status: 'warning',
        position: "top",
        duration: 5000,
      
      })
    }
    useEffect(()=>{

        setOpen(visible)
    },[visible])
    const theme = extendTheme({
        colors: {
          myCustomColor: '#FF0000',
          customBackground: "#000",
          customText: "#333333",
          // 添加其他自定义颜色
        },

        components: {
          Modal: {
            baseStyle: {
                dialog: {
                    bg: "customBackground",
                    color: "#fff",
                  },
              // 自定义 Modal 的样式
            },
            // 添加其他 Modal 样式变体
          },
        },
    });
    const nextStyle = {
        background: '#3960FB',
        borderRadius: '6px',
        opacity:submitLoading?0.5:1,
        fontSize:'16px',
        cursor:submitLoading?'not-allow':'pointer',
        fontWeight:'600'
    }
    const normalStyle =  {
      background: '#3960FB',
      borderRadius: '6px',
      fontSize:'16px',
      fontWeight:'600'
  }
    return (
      <>
        {/* <Button onClick={onOpen}>Open Modal</Button> */}
        <ChakraProvider theme={theme}>
        <Modal isOpen={open} onClose={onClose} 
          size='lg'
          isCentered
         
        >
          <ModalOverlay  
          bg="rgba(0, 0, 0, 0.5)" // 修改这里来设定背景颜色和透明度
          style={{ backdropFilter: 'blur(5px)' }} // 可选，增加模糊效果
          />
          <ModalContent
             backgroundImage={`url(${BG})`}
             backgroundRepeat="no-repeat"
             backgroundSize="100% 100%"
             borderRadius="36px"
            >
            <ModalHeader>
               {modelType!=='register'?<div> 
               <img
               
                src={ArrowLeft}
                alt='Global'
                className='arrow-left'
                onClick={backHandle}
                /> 
                </div>:null}
            </ModalHeader>
            <ModalCloseButton />
           {modelType==='register'? <ModalBody>
              <Center color='#fff' className='title' mt="77px" mb="21px">
                Connect to 3Dizer
              </Center>

              <Flex border='1px' borderColor='gray.400' borderRadius="6px" py='16px' my="16px" alignItems='center' cursor='pointer' onClick={googleHandel}>
              <Image
                borderRadius='full'
                src={Global}
                alt='Global'
                boxSize={'20px'}
                ml="16px"
                mr="10px"
                />
                <Text fontSize="16px">Continue with Google</Text> 
              </Flex>
              <Flex border='1px' borderColor='gray.400' borderRadius="6px" py='16px' alignItems='center' my="16px"  cursor='pointer' onClick={twitterHandel}>
              <Image
                borderRadius='full'
                src={Tw}
                boxSize={'20px'}
                alt='Matemask'
                ml="16px"
                mr="10px"
                />
              <Text fontSize="16px">Continue with Twitter</Text> 
              </Flex>
              <FormControl isInvalid={isEmailError} >
              <InputGroup display="flex" alignItems="center"  className='group-box'>
                <Input type='email' value={emailValue} onChange={handleEmailChange} background="#fff" color="#000" size="lg" placeholder='Continue with Email'/>
                <InputRightElement className='costom-right' >
               {!loading?(isEmailError?
               <Image
               borderRadius='full'
               src={closeImg}
               alt='closeImg'
               boxSize="20px"
               cursor='pointer'
               onClick={closeImgHandel}
               />
               :<Image
                borderRadius='full'
                src={!isHandelArrow?arrowRight:arrowActiveRight}
                alt='arrowRight'
                boxSize="30px"
                cursor={!isHandelArrow?'not-allowed':'pointer'}
                onClick={createdHandel}
                />):
                <img src={LoadingImg}  className='loading-img' /> 
                }
             
                </InputRightElement>
            </InputGroup>
                {isEmailError ? (
                  <Flex alignItems="center"  justifyContent="space-between">
                    <FormErrorMessage>{ emailText }</FormErrorMessage>
                    <Text color="#3961FB" fontSize="sm" mt="5px" cursor='pointer' onClick={createdClick}>
                    Create  Account
                     </Text>
                  </Flex>
                 ) : null}
                </FormControl>
                <Flex alignItems="center" my="21px">
                <Divider flex="1" borderColor="gray.300" />
                <Text px='16px' >or</Text>
                <Divider flex="1" borderColor="gray.300" />
                </Flex>

              <Flex border='1px' borderColor='gray.400' borderRadius="6px" py='16px' my="16px" alignItems='center' cursor='pointer' onClick={comingHandle}>
              <Image
               
                src={Matemask}
                alt='MateMask'
                ml="16px"
                mr="10px"
                />
                <Text fontSize="16px">Continue with MetaMask</Text> 
              </Flex>
              <Flex border='1px' borderColor='gray.400' borderRadius="6px" py='16px' alignItems='center' mt="16px" mb="58px" cursor='pointer' onClick={comingHandle}>
              <Image
                borderRadius='full'
                src={welletConnect}
                alt='wellet Connect'
                ml="16px"
                mr="10px"
                />
              <Text fontSize="16px">Continue with WalletConnect</Text> 
              </Flex>
            </ModalBody> :null}
            {modelType==='created'? <ModalBody>
              <Center color='#fff' className='title' mt="77px" mb="21px">
              Create an entity account
              </Center>
              <FormControl isInvalid={isError} >
                <FormLabel>Email</FormLabel>
                <InputGroup display="flex" alignItems="center"  className='group-two-box'>
                <Input type='email' value={emailValue}  isReadOnly={true} size="lg" cursor="not-allowed"  isDisabled={true}/>
     
                 </InputGroup>
              
                  <FormLabel my="16px">Password </FormLabel>
                <InputGroup display="flex" alignItems="center"  className='group-two-box'>
              
                <Input  type={show ? 'text' : 'password'} value={createdPwdValue} onChange={createdPwdChange} size="lg" />
                <InputRightElement width='4.5rem' mt="4px">
                    <Image
                    src={!show?eye:eyeOpen}
                    alt='arrowRight'
                    cursor='pointer'
                    onClick={handleClick}
                    />
                </InputRightElement>
               
                 </InputGroup>
                {isError ? (
                   <FormErrorMessage>password is required.</FormErrorMessage>
                ) : null}
                <Box mt="16px">
                <Box display="flex" alignItems="center">
                <Image
                    src={createdPwdValue.length>=8?pawActiveRadio:pawRadio}
                    alt='pawRadio'
                    boxSize="16px"
                    mr='5px'
                    />
                
                    <Text>At least 8 characters</Text>
                </Box>
                <Box display="flex" alignItems="center">
                <Image
                    src={/\d+/g.test(createdPwdValue)?pawActiveRadio:pawRadio}
                    alt='pawRadio'
                    boxSize="16px"
                    mr='5px'
                    />
                
                <Text>At least 1 number</Text>
                </Box>
                <Box display="flex" alignItems="center" >
                  <Image
                    src={/[A-Z]/g.test(createdPwdValue)?pawActiveRadio:pawRadio}
                    alt='pawRadio'
                    boxSize="16px"
                    mr='5px'
                    />
                    <Text>At least 1 upper case letter</Text>
                    </Box>
                </Box>
                <Flex  style={normalStyle} align="center" justify='center' py='16px' my="16px"  opacity={!isNextActiveCreated?0.5:1}  cursor={!isNextActiveCreated?'not-allowed':'pointer'} onClick={createdNextHandle}>
                Next
                </Flex>
            </FormControl>
             
            </ModalBody> :null}
            {modelType==='verify'? <ModalBody>
              <Center color='#fff' className='title' mt="77px" mb="21px">
                 Verify your email
              </Center>
             <Box my="40px">
              please enter the 6-digit verification code that was sent to {obfuscateEmail(emailValue)}. The code is valid for 30 minutes.
             </Box>
             <FormControl isInvalid={isVerifyError} my="16px">
               <FormLabel>Verification Code</FormLabel>
              <InputGroup display="flex" alignItems="center"  className='group-box'>
                <Input type='number' value={verifyValue} onChange={handleVerifyChange}  size="lg" borderColor="gray" maxLength={6} />
                <InputRightElement className='costom-right' width='auto' mr='10px'>
                   {!isCounting?<Text color="#3960FB"  cursor='pointer' onClick={()=>handleSendClick(1)}>Code Send</Text> :<Text color="#3960FB" >Resend after {countdown}s</Text>}
                </InputRightElement>
              </InputGroup>
                {isVerifyError ? (
                   <FormErrorMessage>Verification code error.</FormErrorMessage>
                ) : null}
                </FormControl>
                <Flex  style={normalStyle} align="center" justify='center' opacity={verifyValue.length==6?1:"0.5"} py='16px' my="16px"  cursor={verifyValue.length<6?'not-allowed':'pointer'} onClick={verifyHandle}>
                    Next
                </Flex>
            </ModalBody> :null}
            {modelType==='login'? <ModalBody>
              <Center color='#fff' className='title' mt="77px" mb="21px">
              Enter your password
              </Center>
              <FormControl  >
                <FormLabel>Email</FormLabel>
                <InputGroup display="flex" alignItems="center"  className='group-two-box'>
                <Input type='email' value={emailValue} isReadOnly={true} size="lg" cursor="not-allowed"  isDisabled={true}   />
     
                 </InputGroup>
            </FormControl>
            <FormControl isInvalid={isPassError}>
            <FormLabel my="16px">Password</FormLabel>
                <InputGroup display="flex" alignItems="center"  className='group-two-box'>
              
                <Input  type={show ? 'text' : 'password'} value={passwordValue} onChange={handlePwdChange} size="lg" />
                <InputRightElement width='4.5rem' mt="4px">
                    <Image
                    src={!show?eye:eyeOpen}
                    alt='arrowRight'
                   
                    cursor='pointer'
                    onClick={handleClick}
                    />
                </InputRightElement>
               
                 </InputGroup>
                {isPassError ? (
                 
                   <FormErrorMessage >
                    <Text>Password error</Text>
                  
                    </FormErrorMessage>
                 
                 
                ) : null}
            </FormControl>
            <Flex  style={normalStyle}  className={!submitLoading?'opecity-active':'opecity-disabled'} align="center" justify='center' py='16px' mt="16px" opacity={passwordValue.length>=8?1:'0.5'}  cursor={passwordValue.length<8?'not-allowed':'pointer'} onClick={signHandle}>
            {submitLoading?<><Spinner color='#fff' mr="5px"/>Sign In<Box className="dotting"></Box></> : 'Sign In' }
                </Flex>
                <Center color="#3961FB" className='forgot-text' mt="8px"  cursor="pointer" onClick={forgotHandle} mb='32px' fontWeight='600'>Forgot password?</Center>
            </ModalBody> :null}
            {modelType==='seVerify'? <ModalBody>
              <Center color='#fff' className='title' mt="77px" mb="21px">
              Security Verification
              </Center>
            
             <FormControl isInvalid={isVerifyError} my="16px">
               <FormLabel>Email Verification Code</FormLabel>
              <InputGroup display="flex" alignItems="center"  className='group-box'>
                <Input type='email' value={input} onChange={handleInputChange}  size="lg" borderColor="gray" maxLength={6} />
                <InputRightElement className='costom-right' width='auto' mr='10px'>
                   {!isCounting?<Text color="#3960FB"  cursor='pointer' onClick={()=>handleSendClick(2)}>Code Send</Text> :<Text color="#3960FB" >Resend after {countdown}s</Text>}
                </InputRightElement>
              </InputGroup>
                {isVerifyError ? (
                   <FormErrorMessage>Verification code error.</FormErrorMessage>
                ) : null}
                </FormControl>
                <Box>
                  <Box>Enter the 6-digit verification code sent to</Box>
                  <Box>{ obfuscateEmail(emailValue) }.</Box>
                </Box>
                <Flex  style={normalStyle} align="center" justify='center' py='16px' my="16px" mb="48px" opacity={input.length===6 ?'1':'0.5'} cursor={input.length===6?'pointer':'not-allowed'} onClick={submitHandle}>
                 {submitLoading?<><Spinner color='#fff' mr="5px"/> Submiting...</> : 'Submit' }
                </Flex>
            </ModalBody> :null}
            {modelType==='referral'? <ModalBody>
              <Center color='#fff' className='title' mt="77px" mb="21px">
              Set up your account
              </Center>
             <Box mt="40px" mb="25px">
              <Box color="#E4E8F4" fontWeight='400'> Your account has been created</Box>
              <Box color="#E4E8F4" fontWeight='400'>successfully.Set it up now.</Box>
             </Box>

             <FormControl isInvalid={isVerifyError} mb="16px">
               <FormLabel>Referral ID (Optional)</FormLabel>
              <InputGroup display="flex" alignItems="center"  className='group-box'>
                <Input type='email' value={referralCode} onChange={handleReferralChange}  size="lg" borderColor="gray"/>
               
              </InputGroup>
              
                </FormControl>
                <Flex  style={nextStyle} align="center" justify='center' py='16px' mb="70px"  opacity='1' cursor='pointer' onClick={referralHandle}>
                {submitLoading?<><Spinner color='#fff' mr="5px"/> Submiting...</> : 'Submit' }
                </Flex>
            </ModalBody> :null}
            {modelType==='reset'? <ModalBody>
              <Center color='#fff' className='title' mt="77px" mb="21px">
              Reset Password
              </Center>
              <FormControl isInvalid={isSameFirstError} >
                
                <FormLabel my="16px">New Password </FormLabel>
                <InputGroup display="flex" alignItems="center"  className='group-two-box'>
              
                <Input  type={seconedShow ? 'text' : 'password'} value={resetOriginValue} onChange={handleResetChange} size="lg" />
                <InputRightElement width='4.5rem' mt="5px">
                    <Image
                    src={!seconedShow?eye:eyeOpen}
                    alt='arrowRight'
                    
                    cursor='pointer'
                    onClick={handleSeconedClick}
                    />
                </InputRightElement>
               
                 </InputGroup>
                 {isSameFirstError ? (
                   <FormErrorMessage>password error</FormErrorMessage>
                ) : null}
                 <Box mt="16px">
                <Box display="flex" alignItems="center">
                <Image
                    src={resetOriginValue.length>=8?pawActiveRadio:pawRadio}
                    alt='pawRadio'
                    boxSize="16px"
                    mr='5px'
                    />
                
                    <Text>At least 8 characters</Text>
                </Box>
                <Box display="flex" alignItems="center">
                <Image
                    src={/\d+/g.test(resetOriginValue)?pawActiveRadio:pawRadio}
                    alt='pawRadio'
                    boxSize="16px"
                    mr='5px'
                    />
                
                <Text>At least 1 number</Text>
                </Box>
                <Box display="flex" alignItems="center" >
                  <Image
                    src={/[A-Z]/g.test(resetOriginValue)?pawActiveRadio:pawRadio}
                    alt='pawRadio'
                    boxSize="16px"
                    mr='5px'
                    />
                    <Text>At least 1 upper case letter</Text>
                    </Box>
                </Box>
              
            </FormControl>
            <FormControl isInvalid={isSameError} >
            <FormLabel my="16px">Password </FormLabel>
                <InputGroup display="flex" alignItems="center"  className='group-two-box'>
              
                <Input  type={seconedShow ? 'text' : 'password'} value={passwordValue} onChange={handlePwdChange} size="lg" />
                <InputRightElement width='4.5rem' mt="5px">
                    <Image
                    src={!seconedShow?eye:eyeOpen}
                    alt='arrowRight'
                    cursor='pointer'
                    onClick={handleSeconedClick}
                    />
                </InputRightElement>
               
                 </InputGroup>
                {isSameError ? (
                   <FormErrorMessage>Passwords are not the same.</FormErrorMessage>
                ) : null}
              </FormControl>
                <Flex  style={normalStyle} align="center" justify='center' py='16px' my="16px"  mb='32px'  opacity={(passwordValue.length>0 && passwordValue===resetOriginValue)?1:0.5} cursor={resetOriginValue && passwordValue===resetOriginValue?'pointer':'not-allowed'} onClick={confirmPwdHandle}>
                    Submit
                </Flex>
            </ModalBody> :null}
          </ModalContent>
        </Modal>
        </ChakraProvider>
      </>
    )
  }

  export default Login;