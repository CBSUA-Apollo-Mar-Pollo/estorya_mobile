import Svg, { Path, G } from "react-native-svg";

export const Icons = {
  Home: (props) => {
    return (
      <Svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512.000000 512.000000"
        preserveAspectRatio="xMidYMid meet"
        {...props}
      >
        <G transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
          <Path
            d="M2349 4670 c-108 -22 -239 -75 -332 -134 -68 -43 -1223 -990 -1316
-1079 -109 -105 -198 -257 -243 -412 l-23 -80 0 -900 c0 -852 1 -904 19 -970
89 -328 331 -573 639 -645 81 -19 113 -21 405 -18 l317 3 67 32 c94 44 160
109 206 202 l37 75 5 450 c6 430 7 454 27 509 12 32 33 77 47 100 35 61 127
144 193 175 52 24 70 27 163 27 93 0 111 -3 163 -27 66 -31 158 -114 194 -176
14 -23 35 -71 46 -105 20 -58 21 -91 26 -508 l6 -445 37 -75 c46 -93 112 -158
206 -202 l67 -32 317 -3 c292 -3 324 -1 405 18 268 63 491 259 596 522 65 162
61 98 65 1052 3 959 3 956 -60 1119 -38 98 -128 234 -205 309 -107 104 -1247
1039 -1328 1089 -214 133 -498 182 -746 129z"
            fill={props.fill || "black"}
          />
        </G>
      </Svg>
    );
  },
  Group: (props) => {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        height="32px"
        viewBox="0 -960 960 960"
        width="32px"
        {...props}
      >
        <Path
          d="M40-200v-120q0-34 23.5-57t56.5-23h131q20 0 38 10t29 27q29 39 71.5 61t90.5 22q49 0 91.5-22t70.5-61q13-17 30.5-27t36.5-10h131q34 0 57 23t23 57v120q0 17-11.5 28.5T880-160H680q-17 0-28.5-11.5T640-200v-51q-35 25-75.5 38T480-200q-43 0-84-13.5T320-252v52q0 17-11.5 28.5T280-160H80q-17 0-28.5-11.5T40-200Zm440-120q-38 0-72-17.5T351-386q-17-25-42.5-39.5T253-440q22-37 93-58.5T480-520q63 0 134 21.5t93 58.5q-29 0-55 14.5T609-386q-22 32-56 49t-73 17ZM160-440q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T280-560q0 50-34.5 85T160-440Zm640 0q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T920-560q0 50-34.5 85T800-440ZM480-560q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-680q0 50-34.5 85T480-560Z"
          fill={props.fill || "black"}
        />
      </Svg>
    );
  },
  Messager: (props) => {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        height="23px"
        width="23px"
        viewBox="0 0 512.000000 512.000000"
        {...props}
      >
        <G
          transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
          stroke="none"
        >
          <Path
            d="M2335 5093 c-648 -77 -1142 -309 -1571 -737 -257 -258 -452 -557
-578 -886 -268 -704 -210 -1503 155 -2151 l50 -89 -185 -493 c-195 -518 -205
-552 -172 -615 33 -63 96 -102 164 -102 20 0 321 52 669 114 l631 115 81 -34
c176 -74 404 -138 606 -170 138 -22 472 -31 621 -16 1068 107 1950 863 2218
1901 58 228 71 335 71 625 0 215 -4 292 -18 380 -79 477 -259 880 -555 1241
-415 507 -1013 832 -1670 909 -113 13 -432 19 -517 8z m-787 -2212 c72 -39
119 -88 159 -163 25 -48 28 -62 28 -158 0 -100 -1 -108 -34 -168 -39 -72 -88
-120 -163 -159 -48 -25 -62 -28 -158 -28 -96 0 -110 3 -158 28 -75 39 -124 87
-163 159 -33 60 -34 68 -34 168 0 95 3 110 27 157 37 69 81 118 135 150 78 45
112 53 208 50 80 -3 97 -7 153 -36z m1180 0 c72 -39 119 -88 159 -163 25 -48
28 -62 28 -158 0 -100 -1 -108 -34 -168 -39 -72 -88 -120 -163 -159 -48 -25
-62 -28 -158 -28 -96 0 -110 3 -158 28 -75 39 -124 87 -163 159 -33 60 -34 68
-34 168 0 95 3 110 27 157 37 69 81 118 135 150 78 45 112 53 208 50 80 -3 97
-7 153 -36z m1180 0 c72 -39 119 -88 159 -163 25 -48 28 -62 28 -158 0 -100
-1 -108 -34 -168 -39 -72 -88 -120 -163 -159 -48 -25 -62 -28 -158 -28 -96 0
-110 3 -158 28 -75 39 -124 87 -163 159 -33 60 -34 68 -34 168 0 95 3 110 27
157 37 69 81 118 135 150 78 45 112 53 208 50 80 -3 97 -7 153 -36z"
          />
        </G>
      </Svg>
    );
  },
  Bell: function (props) {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <Path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <Path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      </Svg>
    );
  },
};
