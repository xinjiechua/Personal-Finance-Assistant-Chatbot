 </ScrollView>
            <View
                style={{
                    position: "absolute",
                    bottom: 5,
                    right: 15,
                    alignSelf: "flex-end",
                }}
            >
                <TouchableOpacity onPress={toChat} style={{ opacity: 0.75 }}>
                    {/* <Svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={60}
                        height={60}
                        fill="none"
                        opacity={0.4}
                    >
                        <Ellipse
                            cx={30.526}
                            cy={29.698}
                            fill="#5B69D6"
                            rx={29.474}
                            ry={29.698}
                        />
                        <Path
                            fill="#000"
                            stroke="#FCFCFC"
                            strokeWidth={2.5}
                            d="M31.085 30.067H29.84v11.864a.071.071 0 0 1-.067.07.07.07 0 0 1-.046-.02.072.072 0 0 1-.02-.05V30.067H17.931a.07.07 0 0 1-.07-.067.071.071 0 0 1 .07-.067h11.774V18.145a.07.07 0 0 1 .115-.029.072.072 0 0 1 .019.029v11.788H41.665l.048-.004c.01 0 .02 0 .029.004l.409-1.185-.41 1.185a.07.07 0 0 1 .042.039l1.139-.502-1.139.502a.07.07 0 0 1 .006.028h1.245-1.245a.072.072 0 0 1-.047.067.07.07 0 0 1-.029.004l-.048-.004h-10.58Z"
                        />
                    </Svg> */}
                    <Image
                        source={require("../assets/chatbot_home.png")}
                    ></Image>
                </TouchableOpacity>
            </View>
        </View>
    );
}
