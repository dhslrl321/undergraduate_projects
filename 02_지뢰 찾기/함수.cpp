/*#define _CRT_SECURE_NO_WARNINGS
#include<stdio.h>
#include<locale.h>
#include<stddef.h>
wchar_t arr[10][10];
void Plate(void) {
	
	setlocale(LC_ALL, "");
	
	for (int i = 0; i < 10; i++) {
		for (int j = 0; j < 10; j++) {
			arr[i][j] = L'○';
		}
	}

	printf(" 0 1 2 3 4 5 6 7 8 9 \n");
	for (int i = 0; i < 10; i++) {
		printf("%d", i);
		for (int j = 0; j < 10; j++) {
			printf("%lc", arr[i][j]);
		}printf("\n");
	}

}
void UpdatedPlate(void) {
	printf(" 0 1 2 3 4 5 6 7 8 9 \n");
	for (int i = 0; i < 10; i++) {
		printf("%d", i);
		for (int j = 0; j < 10; j++) {
			printf("%lc", arr[i][j]);
		}printf("\n");
	}

}

void Replacing(int a,int b) {
	 arr[a][b] = L'◎';
}

int main(void) {
	
	
	Plate();
	
	int a = 3, b = 2; int inputa = 0, inputb = 0;
	printf("값을 입력 \n"); scanf("%d %d", &inputa, &inputb);
	if (inputa == a && inputb == b) {
		Replacing(inputa, inputb);
		UpdatedPlate();
	}
	return 0;
}
*/