import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { Dot } from 'lucide-react-native'
import { useRouter } from 'expo-router'

const ResetPasswordScreen = () => {
    const router = useRouter()
  return (
     <View className="items-center pt-24 bg-white  h-full">
       <Text className="font-bold text-5xl">Reset Password</Text>

       <Text className=" mt-5 mx-4">
        Enter your email so that we can send a reset password token.
       </Text>


        <View className="mt-10 w-full px-4 gap-y-4">
               <TextInput
                 className="border border-neutral-400 rounded-md h-14 px-4"
                 placeholder="Email"
                 keyboardType="email-address"
                 autoCapitalize="none"
               />

                  <TouchableOpacity className="w-full bg-blue-500 h-14 justify-center items-center rounded-full">
                  <Text className="text-white font-semibold text-xl">
                    Submit
                  </Text>
                </TouchableOpacity>
        </View>


        <View className="flex-row items-center justify-center mt-12">
            <TouchableOpacity onPress={() => router.push("/signin")}>
                <Text className="text-blue-600 font-bold">Sign in</Text>
            </TouchableOpacity>
            <Dot color="black"/>
            <TouchableOpacity onPress={() => router.push("/signup")}>
                <Text  className="text-blue-600 font-bold">Sign up</Text>
            </TouchableOpacity>
                
        </View>

       
      
    </View>
  )
}

export default ResetPasswordScreen