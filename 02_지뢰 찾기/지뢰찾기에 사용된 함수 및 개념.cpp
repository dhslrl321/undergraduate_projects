#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h> 
#include <stdlib.h> 
#include <time.h> 
#include "headerr.h"
 //rand 중복 없이 생성하는 법
/*int main()
{
	int num[6] = { 0 };
	srand(time(NULL));
	for (int i = 0; i < 6; i++) {
		num[i] = rand() % 10;
		for (int j = 0; j < i; j++) {
			if (num[i] == num[j]) {// j는 i-1이라고 생각하고 만약 
				i--;//				j랑 i가 같다면 다시 rand를 생성해야 하므로 돌아가면 된다.
				break;
			}

		}
	}
	for(int i=0;i<6;i++)
	printf("%d ", num[i]);
}*/

/*int main(void) {
	while (1) {
		printf("숫자 입력 \n");
		int input = 0;
		scanf("%d", &input);

	}
	return 0;
}*/

/////////////////////////GetAsyncKeyState 함수 ? x값이나 y 값이 끝으로 가면 0,0으로 돌아감...
/*int main(void)
{
	int x = 0;
	int y = 0;
	SetConsoleSize(30, 20);//x는 30 y는 20으로 보내주는 함수
	while (1) {
		
		Clear();// 잔상을 없애주는 함수
		if (GetAsyncKeyState(VK_UP) & 0x8000) {
			y--;//
			if (y < 0) y = 0;
		}
		if (GetAsyncKeyState(VK_DOWN) & 0x8000) {
			y++;
			if (y > 20) y = 20;
		}
		if (GetAsyncKeyState(VK_LEFT) & 0x8000) {
			x--;
			if (x < 0)x = 0;
		}
		if (GetAsyncKeyState(VK_RIGHT) & 0x8000) { 
			x++; 
			if (x > 30)x = 30;
		}
		GotoXY(x, y);
		printf("_");
		Sleep(50);
	}
	
	system("pause");

		return 0;
}*/
//바둑판을 배열로
const char *arr[10][10];


void Plate(void) {

	for (int i = 0; i < 10; i++) {
		for (int j = 0; j < 10; j++) {
			arr[i][j] = "○";
		}
	}

	printf(" 0 1 2 3 4 5 6 7 8 9 \n");
	for (int i = 0; i < 10; i++) {
		printf("%d", i);
		for (int j = 0; j < 10; j++) {
			printf("%s", arr[i][j]);
		}printf("\n");
	}
	
}

void Replacing(int *arrp) {
	*arrp = "◎";
}

//&arr[i][j]
int main(void) {
	
	Plate();
	while (1) {
		
		int inputa = 0, inputb = 0;
		printf("입력\n"); scanf("%d %d", &inputa, &inputb);
		Replacing(arr[inputa][inputb]);
		
	}
	return 0;
}


