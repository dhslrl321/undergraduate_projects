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
	
	
	MessageBox(NULL,"�츮 ��Ǿ��� �����ּ���....","made by wonikjang//",MB_YESNOCANCEL);
	MessageBox(NULL,"�� ���α׷��� ��� ���α׷��Դϴ�. ������ �����ϱ� �ռ� ���� ����� ���ؼ� ������ �帮�ڽ��ϴ�","made by wonikjang//",MB_OK);
	MessageBox(NULL,"1.����ڴ� �� ���� �ܾ��� ����� ������ ������ �����մϴ�.\n2.����ڴ� �Է¶��� ���Ͻô� �ܾ �����մϴ�.\n3. �� �ܾ �����̸� ��Ǿ��� Ǯ����� �� �ܾ��� �ƹ��͵� ����� ��ġ���� ������ ����� ���׾Ƹ��� �ϳ��� ���ܳ��ϴ�. \n4.�Է��� �ܾ�� ������ �ܾ �ڸ����� ���� �񱳸� �ϰ� ���� ��ġ�ϴ� ���ĺ��� ������ ��Ǿ��� ���� ������ �ʽ��ϴ�.\n5.��ȸ�� �� 6���̹Ƿ� �����ϰ� �����ϼ���.","made by wonikjang//",MB_OK);
	MessageBox(NULL,"��Ǿ��� ������ ��Ǿ����� �ٶ󺸴� �䳢���� � �ڽĵ��� �ְ� ��Ǿ��� ������ִ� ������ ���� �԰� ���� �ڴ� �θ���� �����մϴ�.","made by wonikjang//",MB_OK);
	MessageBox(NULL,"����� ������ ��Ǿ��� �����Դϴ�. ��Ǿ��� ������ �ڽĵ鿡�� ������ ���� �� �Ͽ��� ���� ���� ū �����԰� ��Ǿ����� ������ ��Ǿ��� ���� �����ϴ� AUDI R8 Spider all new turbo 4.5c ���ָ�.�� �緯 ���� �濡 ������ ��ȭ�� �ް� �޷��������� ��ġ�� �Ǿ��ٰ� ������ �Խ��ϴ�.","made by wonikjang//",MB_OK);
	MessageBox(NULL,"�׷� ���� �����մϴ�. ȯ���ǳ��� ��������� .","made by wonikjang//",MB_OK);
	
	printf("\n\n �� �ܾ� ����� �ϰڽ��ϱ�?\n\n");
	printf("1.3�ܾ� ���(����)\n\n2.4�ܾ� ���(�߰�) \n\n3.5�ܾ� ���(�߰�).\n\n4.����.\n\n");
	srand(time(NULL));
	
			
	int dansel=0,rword=0;
	char answord3[4],answord4[5],answord5[6];
	srand(time(NULL));int correct = 0;
	rword = rand()%(30)+0;// ���� �ܾ��� ���� 
	while(dansel !=4 ) 
	{
	
		scanf("%d",&dansel);
		switch(dansel){
			scaffold();
			char input[6]; char comp[6];
			case 1:
			{
					
					memcpy(answord3,word3[rword],6);//�޸� ī�� �Լ�
					//memcpy(������,�����,������); 
					//A = [5] , B =(char*) malloc(10) == new char[10];
					//memset(B,0,10);
					//memset(������,�ʱ�ȭ��,������);
					// free(B) == delete[] B;
					//���� : memcpy(A, B, strlen(B)); => ���� 
					//char comp[6];
					
				
					for(int i=0;i<6;i++){
						printf("�ܾ �Է��ϼ��� \n");
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
				MessageBox(NULL,"��Ǿ��� Ǯ�������ϴ�.","made by wonik",MB_OK); 
				else if( correct == 6)
				MessageBox(NULL,"��Ǿ��� ����� �����մϴ�!!","made by wonik",MB_OK); 
				break;
			
			case 2:
			{
				
					memcpy(answord4,word4[rword],4);
					
					int correct = 0;
				
					for(int i=0;i<6;i++){
						printf("�ܾ �Է��ϼ��� \n");
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
				MessageBox(NULL,"��Ǿ��� Ǯ�������ϴ�.","made by wonik",MB_OK); 
				else if( correct == 6)
				MessageBox(NULL,"��Ǿ��� ����� �����մϴ�!!","made by wonik",MB_OK); 
				break;
			case 3:
			{
					memcpy(answord5,word5[rword],5);
				
					int correct = 0;
				
					for(int i=0;i<6;i++){
						printf("�ܾ �Է��ϼ��� \n");
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
				MessageBox(NULL,"��Ǿ��� Ǯ�������ϴ�.","made by wonik",MB_OK); 
				else if( correct == 6)
				MessageBox(NULL,"��Ǿ��� �׾����ϴ�..","made by wonik",MB_OK); 
				break;
			
			default:
				printf("���� �� �� �Է��߽��ϴ� �ٽ� �Է��ϼ��� . \n");
				break;
		}
	}
	system("pause");

	
	return 0;
}
void scaffold()
{
	printf("\t\t\t\t        ________________ \n") ;
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t---------------------------------------\n");
	return ;

}

void ch1()
{
	printf("\t\t\t\t        ________________ \n") ;
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t      ���            ��\n");
	printf("\t\t\t\t    ��_  _ ��         ��\n");
	printf("\t\t\t\t   �� �� �� ��        ��\n");
	printf("\t\t\t\t    ��  �� ��         ��\n");
	printf("\t\t\t\t      ���            ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t---------------------------------------\n");
	return ;
}
void ch2()
{
	printf("\t\t\t\t        ________________ \n") ;
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t      ���            ��\n");
	printf("\t\t\t\t    ��_  _ ��         ��\n");
	printf("\t\t\t\t   �� �� �� ��        ��\n");
	printf("\t\t\t\t    ��  �� ��         ��\n");
	printf("\t\t\t\t      ���            ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t---------------------------------------\n");
	return ;
}

void ch3()
{
	printf("\t\t\t\t        ________________ \n") ;
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t      ���            ��\n");
	printf("\t\t\t\t    ��_  _ ��         ��\n");
	printf("\t\t\t\t   �� �� �� ��        ��\n");
	printf("\t\t\t\t    ��  �� ��         ��\n");
	printf("\t\t\t\t      ���            ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t        ��            ��\n");
	printf("\t\t\t\t         ��           ��\n");
	printf("\t\t\t\t          ��          ��\n");
	printf("\t\t\t\t           ��         ��\n");
	printf("\t\t\t\t            ��        ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t---------------------------------------\n");
	return ;

}

void ch4()
{
	printf("\t\t\t\t        ________________ \n") ;
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t      ���            ��\n");
	printf("\t\t\t\t    ��_  _ ��         ��\n");
	printf("\t\t\t\t   �� �� �� ��        ��\n");
	printf("\t\t\t\t    ��  �� ��         ��\n");
	printf("\t\t\t\t      ���            ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t     �� ��            ��\n");
	printf("\t\t\t\t    ��   ��           ��\n");
	printf("\t\t\t\t   ��     ��          ��\n");
	printf("\t\t\t\t  ��       ��         ��\n");
	printf("\t\t\t\t ��         ��        ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t---------------------------------------\n");
	return ;
}

void ch5()
{
	printf("\t\t\t\t        ________________ \n") ;
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t      ���            ��\n");
	printf("\t\t\t\t    ��_  _ ��         ��\n");
	printf("\t\t\t\t   �� �� �� ��        ��\n");
	printf("\t\t\t\t    ��  �� ��         ��\n");
	printf("\t\t\t\t      ���            ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t       ��_____         ��\n");
	printf("\t\t\t\t       ��     ��       ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t     �� ��            ��\n");
	printf("\t\t\t\t    ��   ��           ��\n");
	printf("\t\t\t\t   ��     ��          ��\n");
	printf("\t\t\t\t  ��       ��         ��\n");
	printf("\t\t\t\t ��         ��        ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t---------------------------------------\n");
	return ;
}

void ch6()
{
	printf("\t\t\t\t        ________________ \n") ;
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t      ���            ��\n");
	printf("\t\t\t\t    ��_  _ ��         ��\n");
	printf("\t\t\t\t   �� �� �� ��        ��\n");
	printf("\t\t\t\t    ��  �� ��         ��\n");
	printf("\t\t\t\t      ���            ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t�� ____��_____         ��\n");
	printf("\t\t\t\t       ��     ��       ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t       ��              ��\n");
	printf("\t\t\t\t     �� ��            ��\n");
	printf("\t\t\t\t    ��   ��           ��\n");
	printf("\t\t\t\t   ��     ��          ��\n");
	printf("\t\t\t\t  ��       ��         ��\n");
	printf("\t\t\t\t ��         ��        ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t                      ��\n");
	printf("\t\t\t\t---------------------------------------\n");
	
	return ;
}
