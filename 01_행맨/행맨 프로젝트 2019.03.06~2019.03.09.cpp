#include<stdio.h>
#include<windows.h>
#include<stdlib.h>
#include<time.h>

void ch1();void ch2(); 
void ch3();void ch4();
void ch5();void ch6();
void scaffold();

int main()
{
	char word3[30][4] = {"ate","cow","low","max","lax","cop","tax","bye","sex","cap","dog","aim","gym","jam","bus","cat","saw","bow","lie","wiz","won","pow","pan","fan","ram","gen","tip","mvp","vip"};
	char word4[30][5] = {"name","kick","hike","monk","sand","time","vein","hair","fire","team","coke","lion","joke","drum","kind","goat","jail","dick","head","crop","cart","coil","fake","envy","foil","fuel","trim","word","wife","cake"};
	char word5[30][6] = {"heart","choir","dense","entry","trial","organ","equip","lenth","clank","alter","array","clamb","craft","flash","labor","brisk","trend","forge","humid","major","bonus","snake","stock","joint","trace","novel","brand","blink","steam"};
	
	
	MessageBox(NULL,"우리 행맨씨좀 구해주세요....","made by wonikjang//",MB_YESNOCANCEL);
	MessageBox(NULL,"이 프로그램은 행맨 프로그램입니다. 게임을 시작하기 앞서 게임 방법에 대해서 설명해 드리겠습니다","made by wonikjang//",MB_OK);
	MessageBox(NULL,"1.사용자는 몇 글자 단어의 행맨을 시작할 것인지 선택합니다.\n2.사용자는 입력란에 원하시는 단어를 기입합니다.\n3. 그 단어가 정답이면 행맨씨는 풀어나지만 그 단어중 아무것도 정답과 일치하지 않으면 행맨의 몸뚱아리가 하나씩 생겨납니다. \n4.입력한 단어와 정답인 단어가 자릿수를 각자 비교를 하고 서로 일치하는 알파벳이 있으면 행맨씨의 몸은 생기지 않습니다.\n5.기회는 총 6번이므로 신중하게 선택하세요.","made by wonikjang//",MB_OK);
	MessageBox(NULL,"행맨씨가 죽으면 행맨씨만을 바라보는 토끼같은 어린 자식들이 있고 행맨씨가 벌어다주는 돈으로 밥을 먹고 잠을 자는 부모님이 슬퍼합니다.","made by wonikjang//",MB_OK);
	MessageBox(NULL,"참고로 오늘은 행맨씨의 생일입니다. 행맨씨의 부인은 자식들에게 쓰느라 쓰지 못 하였던 돈을 오늘 큰 마음먹고 행맨씨에게 쓰려고 행맨씨가 제일 좋아하는 AUDI R8 Spider all new turbo 4.5c 가솔린.을 사러 가는 길에 경찰의 전화를 받고 달려나갔더니 납치가 되었다고 연락이 왔습니다.","made by wonikjang//",MB_OK);
	MessageBox(NULL,"그럼 게임 시작합니다. 환상의나라 에버렌드로 .","made by wonikjang//",MB_OK);
	
	printf("\n\n 몇 단어 행맨을 하겠습니까?\n\n");
	printf("1.3단어 행맨(쉬움)\n\n2.4단어 행맨(중간) \n\n3.5단어 행맨(중간).\n\n4.종료.\n\n");
	srand(time(NULL));
	
			
	int dansel=0,rword=0;
	char answord3[4],answord4[5],answord5[6];
	srand(time(NULL));int correct = 0;
	rword = rand()%(30)+0;// 랜덤 단어의 생성 
	while(dansel !=4 ) 
	{
	
		scanf("%d",&dansel);
		switch(dansel){
			scaffold();
			char input[6]; char comp[6];
			case 1:
			{
					
					memcpy(answord3,word3[rword],6);//메모리 카피 함수
					//memcpy(목적지,출발점,사이즈); 
					//A = [5] , B =(char*) malloc(10) == new char[10];
					//memset(B,0,10);
					//memset(목적지,초기화값,사이즈);
					// free(B) == delete[] B;
					//예제 : memcpy(A, B, strlen(B)); => 오류 
					//char comp[6];
					
				
					for(int i=0;i<6;i++){
						printf("단어를 입력하세요 \n");
						scanf("%s",&input);
						//system("cls");
						for(int j=0; j < 3; j++){
							if(answord3[j]==input[j])
							{
								comp[j]=input[j];
							}
							else
							{
								comp[j]='_';
							}
						 
						}
						if(comp[0]=='_' ||comp[1]=='_' ||comp[2]=='_' ) correct +=1;
						else correct = 0;
						printf("%c %c %c\n\n",comp[0],comp[1],comp[2]); 
						switch(correct){
							case 1:
								ch1();
								break;
							case 2:
								ch2();
								break;
							case 3:
								ch3();
								break;
							case 4:
								ch4();
								break;
							case 5:
								ch5();
								break;			
							case 6:
								ch6();
								break;
							default: 
							
								break;
						}
						
						if(correct ==0 ) break;
					}
					
				}
				if(input==answord3) 
				MessageBox(NULL,"행맨씨는 풀려났습니다.","made by wonik",MB_OK); 
				else if( correct == 6)
				MessageBox(NULL,"행맨씨의 목숨이 위험합니다!!","made by wonik",MB_OK); 
				break;
			
			case 2:
			{
				
					memcpy(answord4,word4[rword],4);
					
					int correct = 0;
				
					for(int i=0;i<6;i++){
						printf("단어를 입력하세요 \n");
						scanf("%s",&input);
						for(int j=0; j < 4; j++){
							if(answord4[j]==input[j])
							{
								comp[j]=input[j];
							}
							else
							{
								comp[j]='_';
							}
						
						}
						if(comp[0]=='_' ||comp[1]=='_' ||comp[2]=='_'||comp[3]=='_' ) correct +=1;
						else correct = 0;
						printf("%c %c %c %c\n\n",comp[0],comp[1],comp[2],comp[3]); 
						switch(correct){
							case 1:
								ch1();
								break;
							case 2:
								ch2();
								break;
							case 3:
								ch3();
								break;
							case 4:
								ch4();
								break;
							case 5:
								ch5();
								break;			
							case 6:
								ch6();
								break;
							default: 
							
								break;
						}
						
						if(correct ==0 ) break;
					}
					
				}
				if(input==answord4) 
				MessageBox(NULL,"행맨씨는 풀려났습니다.","made by wonik",MB_OK); 
				else if( correct == 6)
				MessageBox(NULL,"행맨씨의 목숨이 위험합니다!!","made by wonik",MB_OK); 
				break;
			case 3:
			{
					memcpy(answord5,word5[rword],5);
				
					int correct = 0;
				
					for(int i=0;i<6;i++){
						printf("단어를 입력하세요 \n");
						scanf("%s",&input);
						//system("cls");
						for(int j=0; j < 5; j++){
							if(answord5[j]==input[j])
							{
								comp[j]=input[j];
							}
							else
							{
								comp[j]='_';
							}
						
						}
						if(comp[0]=='_' ||comp[1]=='_' ||comp[2]=='_' || comp[3]=='_' ||comp[4]=='_') correct +=1;
						else correct = 0;
						printf("%c %c %c %c %c\n\n",comp[0],comp[1],comp[2],comp[3],comp[4]); 
						switch(correct){
							case 1:
								ch1();
								break;
							case 2:
								ch2();
								break;
							case 3:
								ch3();
								break;
							case 4:
								ch4();
								break;
							case 5:
								ch5();
								break;			
							case 6:
								ch6();
								break;
							default: 
							
								break;
						}
						
						if(correct ==0 ) break;
					}
					
				}
				if(input==answord5) 
				MessageBox(NULL,"행맨씨는 풀려났습니다.","made by wonik",MB_OK); 
				else if( correct == 6)
				MessageBox(NULL,"행맨씨는 죽었습니다..","made by wonik",MB_OK); 
				break;
			
			default:
				printf("수를 잘 못 입력했습니다 다시 입력하세요 . \n");
				break;
		}
	}
	system("pause");

	
	return 0;
}
void scaffold()
{
	printf("\t\t\t\t        ________________ \n") ;
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t---------------------------------------\n");
	return ;

}

void ch1()
{
	printf("\t\t\t\t        ________________ \n") ;
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t      ■■            │\n");
	printf("\t\t\t\t    ■_  _ ■         │\n");
	printf("\t\t\t\t   ■ ㅇ ㅇ ■        │\n");
	printf("\t\t\t\t    ■  ♭ ■         │\n");
	printf("\t\t\t\t      ■■            │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t---------------------------------------\n");
	return ;
}
void ch2()
{
	printf("\t\t\t\t        ________________ \n") ;
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t      ■■            │\n");
	printf("\t\t\t\t    ■_  _ ■         │\n");
	printf("\t\t\t\t   ■ ㅇ ㅇ ■        │\n");
	printf("\t\t\t\t    ■  ♭ ■         │\n");
	printf("\t\t\t\t      ■■            │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t---------------------------------------\n");
	return ;
}

void ch3()
{
	printf("\t\t\t\t        ________________ \n") ;
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t      ■■            │\n");
	printf("\t\t\t\t    ■_  _ ■         │\n");
	printf("\t\t\t\t   ■ ㅇ ㅇ ■        │\n");
	printf("\t\t\t\t    ■  ♭ ■         │\n");
	printf("\t\t\t\t      ■■            │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t        〕            │\n");
	printf("\t\t\t\t         〕           │\n");
	printf("\t\t\t\t          〕          │\n");
	printf("\t\t\t\t           〕         │\n");
	printf("\t\t\t\t            〕        │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t---------------------------------------\n");
	return ;

}

void ch4()
{
	printf("\t\t\t\t        ________________ \n") ;
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t      ■■            │\n");
	printf("\t\t\t\t    ■_  _ ■         │\n");
	printf("\t\t\t\t   ■ ㅇ ㅇ ■        │\n");
	printf("\t\t\t\t    ■  ♭ ■         │\n");
	printf("\t\t\t\t      ■■            │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t     〔 〕            │\n");
	printf("\t\t\t\t    〔   〕           │\n");
	printf("\t\t\t\t   〔     〕          │\n");
	printf("\t\t\t\t  〔       〕         │\n");
	printf("\t\t\t\t 〔         〕        │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t---------------------------------------\n");
	return ;
}

void ch5()
{
	printf("\t\t\t\t        ________________ \n") ;
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t      ■■            │\n");
	printf("\t\t\t\t    ■_  _ ■         │\n");
	printf("\t\t\t\t   ■ ㅇ ㅇ ■        │\n");
	printf("\t\t\t\t    ■  ♭ ■         │\n");
	printf("\t\t\t\t      ■■            │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t       │_____         │\n");
	printf("\t\t\t\t       │     》       │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t     〔 〕            │\n");
	printf("\t\t\t\t    〔   〕           │\n");
	printf("\t\t\t\t   〔     〕          │\n");
	printf("\t\t\t\t  〔       〕         │\n");
	printf("\t\t\t\t 〔         〕        │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t---------------------------------------\n");
	return ;
}

void ch6()
{
	printf("\t\t\t\t        ________________ \n") ;
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t      ■■            │\n");
	printf("\t\t\t\t    ■_  _ ■         │\n");
	printf("\t\t\t\t   ■ ㅇ ㅇ ■        │\n");
	printf("\t\t\t\t    ■  ♭ ■         │\n");
	printf("\t\t\t\t      ■■            │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t《 ____│_____         │\n");
	printf("\t\t\t\t       │     》       │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t       │              │\n");
	printf("\t\t\t\t     〔 〕            │\n");
	printf("\t\t\t\t    〔   〕           │\n");
	printf("\t\t\t\t   〔     〕          │\n");
	printf("\t\t\t\t  〔       〕         │\n");
	printf("\t\t\t\t 〔         〕        │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t                      │\n");
	printf("\t\t\t\t---------------------------------------\n");
	
	return ;
}
